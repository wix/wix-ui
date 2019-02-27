import { mount } from 'enzyme';
import path from 'path';

import kebabCase from 'lodash.kebabcase';
import * as builders from './index';

import { code } from './views/code';
import { liveCode } from './views/live-code';

import { SectionType } from '../typings/story-section';
import { api } from './views/api';
import { storyConfigEmpty } from './views/testUtils';
import { getView } from './views/tab';
import { error as errorView } from './views/error';

const cwd = path.resolve(__dirname, 'views');
const methodToFileName = f => kebabCase(path.parse(f).name);

const sectionTypes = Object.keys(SectionType).map(t => SectionType[t]);

describe('Sections', () => {
  sectionTypes.map(type => {
    it(`should export view for ${type} section`, () => {
      try {
        const view = require(path.resolve(cwd, methodToFileName(type)));
        expect(typeof view[type]).toBe('function');
      } catch (e) {
        throw new Error(
          `Missing view function for "${type}" section type. Make sure one exists in src/Sections/views. ERROR: ${e}`,
        );
      }
    });

    it(`should have builder for "${type}" section type`, () =>
      expect(typeof builders[type]).toBe('function'));

    if (type !== SectionType.Error) {
      it(`should have view for "${type}" section type`, () =>
        // if section has no view, fallback is SectionType.Error
        // ensure view exists by checking that it doesn't use fallback
        expect(getView(type)).not.toEqual(errorView));
    }
  });

  it('should use parsedSource from api section', () => {
    const parsedSource = { props: {} };
    const renderedProps = mount(
      api({ type: SectionType.Api, parsedSource }, storyConfigEmpty),
    ).props();
    expect(renderedProps.parsedSource).toEqual(parsedSource);
  });

  describe('liveCode and code sections', () => {
    it('should be the same', () => {
      // TODO: this is temporary, only `code` should remain. Remove `liveCode` once users migrate
      expect(builders.code).toEqual(builders.liveCode);
      expect(code).toEqual(liveCode);
    });
  });
});

describe('title section', () => {
  it('should work with string or object', () => {
    expect(builders.title({ title: 'hello' })).toEqual(
      expect.objectContaining({
        title: 'hello',
      }),
    );

    expect(builders.title('hello')).toEqual(
      expect.objectContaining({
        title: 'hello',
      }),
    );
  });
});
