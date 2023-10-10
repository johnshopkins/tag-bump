import getLatestTag from '../../lib/get-latest-tag.js';

describe('getLatestTag',  () => {

  test('No tags',  () => {
    expect(getLatestTag([])).toEqual('0');
  });

  test('Major version without a minor version',  () => {
    expect(getLatestTag(['1.0', '2'])).toEqual('2.0');
  });

  test('Major.minor version without a bugfix version',  () => {
    expect(getLatestTag(['1.0', '2.1'])).toEqual('2.1');
  });

  test('Major.minor version with multiple bugfix versions',  () => {
    expect(getLatestTag(['1.0', '2.1', '2.1.1', '2.1.2'])).toEqual('2.1.2');
  });

});
