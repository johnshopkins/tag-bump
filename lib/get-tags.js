var execSync = require('child_process').execSync;

module.exports = function () {

  var tags = execSync('git tag').toString();
  var lines = tags.toString().split('\n');

  var versions = [];

  lines.map(function (line) {
    if (line === '') return; // empty line in output
    versions.push(line.replace(/^v/, ''));
  });

  return versions;

};
