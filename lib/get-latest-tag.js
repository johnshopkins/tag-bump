/**
 * Finds the largest number in an array
 * of numbers.
 * @param  {array} array
 * @return {integer} Largest number
 */
function arrayMax(array) {
  var max = 0;
  var length = array.length;

  for (var i = 0; i < length; i++) {

    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
}

module.exports = function (tags) {

  // [1, 2, 3]
  var majors = [];

  // {1: 1, 2, 3, 2: 1, 2, 3 }
  var minors = {};

  // { 1.1: 1, 2, 3, 1.2: 1, 2 }
  var hotfixes = {};

  tags.forEach(function (tag) {

    // ["4", "3", "2"]
    var parts = tag.split('.');


    // parse the tag number

    var key, major, minor, hotfix;

    if (parts[0]) {
      major = parts[0];
      majors.push(parseInt(major));
    }

    if (parts[1]) {
      key = major;
      if (!minors[key]) minors[key] = [];

      minor = parts[1];
      minors[key].push(parseInt(minor));
    }

    if (parts[2]) {
      key = parts[0] + "." + parts[1];
      if (!hotfixes[key]) hotfixes[key] = [];

      hotfix = parts[2];
      hotfixes[key].push(parseInt(hotfix));
    }
  });

  // find largest major version
  var maxMajor = arrayMax(majors);
  if (!minors[maxMajor]) {
    return maxMajor + ".0";
  }

  // find largest minor version in major version
  minors = minors[maxMajor];
  var maxMinor = arrayMax(minors);
  if (!hotfixes[maxMajor + "." + maxMinor]) {
    return maxMajor + "." + maxMinor;
  }

  // find largest hotfix in major.minor version
  hotfixes = hotfixes[maxMajor + "." + maxMinor];
  var maxHotfix = arrayMax(hotfixes);

  return maxMajor + "." + maxMinor + "." + maxHotfix;

};
