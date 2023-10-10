import getTags from "../../lib/get-tags.js";
import * as exec from '../../lib/exec.js';

jest.mock('./exec.js', () => ({
  __esModule: true,
  default: () => Promise.resolve({ stdout: 'blah' }),
}));

describe('getTags',  () => {

  beforeEach(() => jest.resetModules());

  test('No tags', async () => {
    exec.default = () => Promise.resolve({ stdout: '' })
    await expect(getTags()).resolves.toEqual(([]));
  });

  describe('No prepended v or =', () => {

    test('One tag', async () => {
      exec.default = () => Promise.resolve({ stdout:'1.0\n' });
      await expect(getTags()).resolves.toEqual((['1.0']));
    });

    test('Many tags', async () => {
      exec.default = () => Promise.resolve({ stdout:'1.0\n1.1\n1.0\n1.1.1\n1.1.2\n' });
      await expect(getTags()).resolves.toEqual((['1.0', '1.1', '1.0', '1.1.1', '1.1.2']));
    });

  });

  describe('Prepended v', () => {

    test('One tag', async () => {
      exec.default = () => Promise.resolve({ stdout:'v1.0\n' });
      await expect(getTags()).resolves.toEqual((['1.0']));
    });

    test('Many tags', async () => {
      exec.default = () => Promise.resolve({ stdout:'v1.0\nv1.1\nv1.0\nv1.1.1\nv1.1.2\n' });
      await expect(getTags()).resolves.toEqual((['1.0', '1.1', '1.0', '1.1.1', '1.1.2']));
    });

  });

  describe('Prepended =', () => {

    test('One tag', async () => {
      exec.default = () => Promise.resolve({ stdout:'=1.0\n' });
      await expect(getTags()).resolves.toEqual((['1.0']));
    });

    test('Many tags', async () => {
      exec.default = () => Promise.resolve({ stdout:'=1.0\n=1.1\n1.0\n=1.1.1\n=1.1.2\n' });
      await expect(getTags()).resolves.toEqual((['1.0', '1.1', '1.0', '1.1.1', '1.1.2']));
    });

  });

  describe('Prepended =v', () => {

    test('One tag', async () => {
      exec.default = () => Promise.resolve({ stdout:'=v1.0\n' });
      await expect(getTags()).resolves.toEqual((['1.0']));
    });

    test('Many tags', async () => {
      exec.default = () => Promise.resolve({ stdout:'=v1.0\n=v1.1\n1.0\n=v1.1.1\n=v1.1.2\n' });
      await expect(getTags()).resolves.toEqual((['1.0', '1.1', '1.0', '1.1.1', '1.1.2']));
    });

  });

});
