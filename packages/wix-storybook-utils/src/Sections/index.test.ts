import path from 'path';

import kebabCase from 'lodash.kebabcase';
import * as builders from './index';

import { SectionType } from '../typings/story-section';

const cwd = path.resolve(__dirname, 'views');
const methodToFileName = f => kebabCase(path.parse(f).name);

const sectionTypes = Object.keys(SectionType).map(t => SectionType[t]);

describe('Sections', () => {
  it('should have exported view for each section', () => {
    sectionTypes.map(type => {
      try {
        const view = require(path.resolve(cwd, methodToFileName(type)));
        expect(typeof view[type]).toBe('function');
      } catch (e) {
        throw new Error(
          `Missing view function for "${type}" section type. Make sure one exists in src/Sections/views. ERROR: ${e}`,
        );
      }
    });
  });

  sectionTypes.map(type =>
    it(`should have builder for "${type}" section type`, () =>
      expect(typeof builders[type]).toBe('function')),
  );
});
