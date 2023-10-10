export default (current, type) => {

  let parts = current.split('.');

  parts = parts.map(value => Number(value));

  if (type === 'bugfix') {

    // add bugfix part if not present
    if (!parts[2]) parts[2] = 0;

    // add minor part if not present
    if (!parts[1]) parts[1] = 0;

    // increment bugfix version
    parts[2] += 1;

  } else if (type === 'minor') {

    // get rid of bugfix part
    if (parts[2]) parts.splice(2);

    // add minor part if not present
    if (!parts[1]) parts[1] = 0;

    // increment minor version
    parts[1] += 1;

  } else { // major

    // get rid of bugfix part
    if (parts[2]) parts.splice(2);

    // incremement major version, set minor version to 0
    parts[0] += 1;
    parts[1] = 0;

  }

  return parts.join('.');

};
