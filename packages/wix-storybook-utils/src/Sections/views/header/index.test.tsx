import { mount } from 'enzyme';

import { HeaderSection } from '../../../typings/story-section';
import { header as headerBuilder } from '../../index';

import { header } from '.';

const testkit = () => {
  let component;

  const storyConfigMock = {
    metadata: {
      displayName: 'test',
      props: {},
    },
    config: {
      importFormat: '',
      moduleName: '',
      repoBaseURL: '',
    },
    component: {},
  };

  const issueUrlHook = 'section-header-issueUrl';
  const sourceUrlHook = 'section-header-sourceUrl';

  return {
    when: {
      created: (section: HeaderSection, config = {}) => {
        component = mount(header(section, { ...storyConfigMock, ...config }));
        return component;
      },
    },

    get: {
      issueUrl: () =>
        component.find(`[data-hook="${issueUrlHook}"] a`).prop('href'),

      sourceUrl: () =>
        component.find(`[data-hook="${sourceUrlHook}"] a`).prop('href'),

      issueUrlExists: () =>
        !!component.find(`[data-hook="${issueUrlHook}"]`).length,

      sourceUrlExists: () =>
        !!component.find(`[data-hook="${sourceUrlHook}"]`).length,
    },
  };
};

describe('header section view', () => {
  describe('issueUrl', () => {
    it('should be rendered from issueUrl section config', () => {
      const section = headerBuilder({ issueUrl: 'hello' });

      const driver = testkit();
      driver.when.created(section);
      expect(driver.get.issueUrl()).toBe('hello');
    });

    it('should be derived from storyConfig', () => {
      const section = headerBuilder({});

      const driver = testkit();
      driver.when.created(section, {
        config: {
          issueURL: 'hello',
        },
      });

      expect(driver.get.issueUrl()).toBe('hello');

      driver.when.created(section, {
        config: {
          issueURL: '',
        },
      });

      expect(driver.get.issueUrlExists()).toBe(false);
    });
  });

  describe('sourceUrl', () => {
    it('should be rendered from sourceUrl section config', () => {
      const section = headerBuilder({ sourceUrl: 'hello' });

      const driver = testkit();
      driver.when.created(section);
      expect(driver.get.sourceUrl()).toBe('hello');
    });
  });
});
