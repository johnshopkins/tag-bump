import fs from 'fs/promises'
import chalk from "chalk";

export default async (file, newTag) => {

  try {
    await fs.stat(file);
  } catch (err) {
    console.log(chalk.yellow(`${file} does not exist; skipping.`));
    return false;
  }

  try {

    const data = await fs.readFile(file, 'utf-8');
    const newData = data.replace(/("version":\s*")[^"]+(")/i, '$1' + newTag + '$2');
    await fs.writeFile(file, newData, 'utf8');

    console.log(chalk.green(`${file} updated with new version.`));
    return true;

  } catch (err) {
    console.log(chalk.yellow(`Unable to update ${file}; skipping.`));
    // console.log(chalk.yellow(`Given error: ${err}`));
    return false;
  }

}
