import exec from './exec.js';

export default async () => {

  const tags = await exec('git tag');
  const lines = tags.stdout.split('\n');

  const versions = lines.map((line => line !== '' ? line.replace(/^=?v?/, '') : null));
  return versions.filter(v => v !== null);

};
