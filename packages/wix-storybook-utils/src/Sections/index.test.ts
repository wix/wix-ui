import { mount } from 'enzyme';
import path from 'path';

import kebabCase from 'lodash.kebabcase';
import * as builders from './index';

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
});

describe('title section', () => {
  it('should work with string or config object', () => {
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

describe('columns section', () => {
  it('should work with array or config object', () => {
    const items = ['a', 'b', 'c'].map(c => builders.title(c));

    expect(builders.columns({ items })).toEqual(
      expect.objectContaining({ items }),
    );

    expect(builders.columns(items)).toEqual(expect.objectContaining({ items }));
  });
});

describe('tabs section', () => {
  it('should work with array or config object', () => {
    const tabs = [1, 2, 3].map(c => builders.tab({ sections: [] }));
    expect(builders.tabs({ tabs })).toEqual(expect.objectContaining({ tabs }));
    expect(builders.tabs(tabs)).toEqual(expect.objectContaining({ tabs }));
  });
});

describe('description section', () => {
  it('should work with string or config object', () => {
    const text = 'hello text';
    const expectation = expect.objectContaining({ text });

    expect(builders.description({ text })).toEqual(expectation);
    expect(builders.description(text)).toEqual(expectation);
  });
});

describe('table section', () => {
  it('should work with array or config object', () => {
    expect(builders.table({ rows: [] })).toEqual(
      expect.objectContaining({ rows: [] }),
    );
    expect(builders.table([])).toEqual(expect.objectContaining({ rows: [] }));
  });
});

describe('importExample section', () => {
  it('should work with string or config object', () => {
    const source = 'hello world';
    expect(builders.importExample({ source })).toEqual(
      expect.objectContaining({ source }),
    );
    expect(builders.importExample(source)).toEqual(
      expect.objectContaining({ source }),
    );
  });
});

describe('code section', () => {
  it('should work with string or config object', () => {
    const source = 'hello world';
    expect(builders.code({ source })).toEqual(
      expect.objectContaining({ source }),
    );
    expect(builders.code(source)).toEqual(expect.objectContaining({ source }));
  });
});
