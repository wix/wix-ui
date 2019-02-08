import path from 'path';

import kebabCase from 'lodash.kebabcase';
import * as builders from './index';

import { code } from './views/code';
import { liveCode } from './views/live-code';

import { SectionType } from '../typings/story-section';

const cwd = path.resolve(__dirname, 'views');
const methodToFileName = f => kebabCase(path.parse(f).name);

const sectionTypes = Object.keys(SectionType).map(t => SectionType[t]);

describe('Sections', () => {
  sectionTypes.map(type =>
    it(`should export view for ${type} section`, () => {
      try {
        const view = require(path.resolve(cwd, methodToFileName(type)));
        expect(typeof view[type]).toBe('function');
      } catch (e) {
        throw new Error(
          `Missing view function for "${type}" section type. Make sure one exists in src/Sections/views. ERROR: ${e}`,
        );
      }
    }),
  );

  sectionTypes.map(type =>
    it(`should have builder for "${type}" section type`, () =>
      expect(typeof builders[type]).toBe('function')),
  );

  describe('liveCode and code sections', () => {
    it('should be the same', () => {
      // TODO: this is temporary, only `code` should remain. Remove `liveCode` once users migrate
      expect(builders.code).toEqual(builders.liveCode);
      expect(code).toEqual(liveCode);
    });
  });
});
