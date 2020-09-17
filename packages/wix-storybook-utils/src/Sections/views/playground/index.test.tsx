import React from 'react';
import { mount } from 'enzyme';
import { deepAssign } from '../../../test-utils/deep-assign';

import AutoExample from '../../../AutoExample';
import { PlaygroundSection } from '../../../typings/story-section';
import { playground as playgroundBuilder } from '../../index';

import { playground } from '.';

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

  return {
    when: {
      created: (section: PlaygroundSection, config = {}) => {
        component = mount(
          playground(section, deepAssign(storyConfigMock, config)),
        );
        return component;
      },
    },

    get: {
      autoExample: () => component.find(AutoExample),
    },
  };
};

describe('playground section view', () => {
  describe('given metadata with deprecated props', () => {
    it('should not pass them to AutoExample', () => {
      const section = playgroundBuilder({});
      const driver = testkit();
      driver.when.created(section, {
        component: () => <div />,
        metadata: {
          props: { deprecated: { tags: [{ title: 'deprecated' }] } },
        },
      });

      const { props } = driver.get.autoExample().prop('parsedSource');
      expect(props.deprecated).toEqual(undefined);
    });
  });
});
