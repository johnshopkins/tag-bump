#!/usr/bin/env node

import chalk from 'chalk';
import minimist from 'minimist';

import exec from '../lib/exec.js';
import getLatestTag from '../lib/get-latest-tag.js';
import getNewTag from '../lib/get-new-tag.js';
import getTags from '../lib/get-tags.js';
import { binary, question } from '../lib/prompt.js';
import updateManifrst from '../lib/update-manifest.js';

try {
  await exec('git status');
} catch (error) {
  console.log(chalk.bold.red('There is not a git repository in this directory.'));
  process.exit(1);
}

try {

  const argv = minimist(process.argv.slice(2));

  const type = argv._.shift();
  const valid = ['major', 'minor', 'bugfix'];

  if (!type || valid.indexOf(type) === -1) {
    throw new Error('Please provide a valid bump type (major, minor, or bugfix)');
  }

  const tags = await getTags();
  const latest = getLatestTag(tags);
  const newTag = getNewTag(latest, type);

  console.log(chalk.green('The new tag is: ') + chalk.green.bold(newTag));

  const assumeYes = argv.y !== undefined && argv.y === true;
  const defaultTagMessage = 'Version ' + newTag;

  const updateFiles = assumeYes ? true : await binary('Updated composer.json and/or package.json?', true);
  const createTag = assumeYes ? true : await binary('Create the tag now?', true);
  const tagMessage = createTag ? (assumeYes ? defaultTagMessage : await question('Tag message', defaultTagMessage)) : '';

  if (updateFiles) {

    const filesToUpdate = ['composer.json', 'package.json'];
    const updated = [];

    await Promise.all(filesToUpdate.map(async (file) => {
      const result = await updateManifrst(file, newTag);
      if (result) updated.push(file);
    }));

    if (updated.length > 0) {

      // remove any staged files
      await exec('git reset head');

      const files = updated.join(' ');
      await exec(`git add ${files}`);

      // commit changes
      await exec('git commit -m "Bumped version."');
    }
  }

  if (createTag) {

    const tagCommand = `git tag -a v${newTag} -m "${tagMessage}"`;

    await exec(tagCommand);
    console.log(chalk.green(`Tag v${newTag} created.`));

  } else {
    console.log(chalk.green('To create the tag manually, run: ' + chalk.green.bold('git tag -a v' + newTag + ' -m "Version ' + newTag + '"')));
  }

} catch (error) {
  console.log(chalk.bold.red(error))
}
