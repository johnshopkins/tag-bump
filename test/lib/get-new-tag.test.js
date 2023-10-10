import getNewTag from '../../lib/get-new-tag.js';

describe('getNewTag',  () => {

  test('should bump a bugfix release',  () => {
    expect(getNewTag('1', 'bugfix')).toEqual('1.0.1');
    expect(getNewTag('1.2', 'bugfix')).toEqual('1.2.1');
    expect(getNewTag('1.2.3', 'bugfix')).toEqual('1.2.4');
  });

  test('should bump a minor release',  () => {
    expect(getNewTag('1', 'minor')).toEqual('1.1');
    expect(getNewTag('1.2', 'minor')).toEqual('1.3');
    expect(getNewTag('1.2.3', 'minor')).toEqual('1.3');
  });

  test('should bump a major release',  () => {
    expect(getNewTag('1', 'major')).toEqual('2.0');
    expect(getNewTag('1.2', 'major')).toEqual('2.0');
    expect(getNewTag('1.2.3', 'major')).toEqual('2.0');
  });

});
