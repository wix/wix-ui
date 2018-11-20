import path from 'path';

import kebabCase from 'lodash.kebabcase';
import * as builders from './index';

import { SectionType } from '../typings/story-section';

const cwd = path.resolve(__dirname, 'renderers');
const methodToFileName = f => kebabCase(path.parse(f).name);

const sectionTypes = Object.keys(SectionType).map(t => SectionType[t]);

describe('Sections', () => {
  it('should be exported in renderers', () => {
    sectionTypes.map(type => {
      try {
        const renderer = require(path.resolve(cwd, methodToFileName(type)));
        expect(typeof renderer[type]).toBe('function');
      } catch (e) {
        throw new Error(
          `Missing renderer function for "${type}" section type. Make sure one exists in src/Sections/renderers. ERROR: ${e}`,
        );
      }
    });
  });

  sectionTypes.map(type =>
    it(`should have builder for "${type}" section type`, () =>
      expect(typeof builders[type]).toBe('function')),
  );
});
