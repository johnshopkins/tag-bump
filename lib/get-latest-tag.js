export default (tags) => {
  
  if (tags.length === 0) {
    return '0';
  }

  // [1, 2, 3]
  const majors = [];

  // {1: 1, 2, 3, 2: 1, 2, 3 }
  let minors = {};

  // { 1.1: 1, 2, 3, 1.2: 1, 2 }
  let bugfixes = {};

  tags.forEach(tag => {

    // ["4", "3", "2"]
    const parts = tag.split('.');

    // parse the tag number

    let key, minor, bugfix;

    const major = parts[0];
    majors.push(parseInt(major));

    if (parts[1]) {
      key = major;
      if (!minors[key]) minors[key] = [];

      minor = parts[1];
      minors[key].push(parseInt(minor));
    }

    if (parts[2]) {
      key = parts[0] + "." + parts[1];
      if (!bugfixes[key]) bugfixes[key] = [];

      bugfix = parts[2];
      bugfixes[key].push(parseInt(bugfix));
    }
  });

  // find largest major version
  const maxMajor = Math.max(...majors);
  if (!minors[maxMajor]) {
    // this major version has no minor version
    return maxMajor + ".0";
  }

  // find largest minor version in major version
  minors = minors[maxMajor];
  const maxMinor = Math.max(...minors);
  if (!bugfixes[maxMajor + "." + maxMinor]) {
    // this major.minor version has no bugfix version
    return maxMajor + "." + maxMinor;
  }

  // find largest bugfix in major.minor version
  bugfixes = bugfixes[maxMajor + "." + maxMinor];
  const maxBugfix = Math.max(...bugfixes);

  return maxMajor + "." + maxMinor + "." + maxBugfix;

};
