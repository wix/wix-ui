import React from 'react';
import { mount } from 'enzyme';
import { deepAssign } from '../../../../test/utils/deep-assign';

import AutoDocs from '../../../AutoDocs';
import { ApiSection } from '../../../typings/story-section';
import { api as apiBuilder } from '../../index';

import { api } from '.';

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
      created: (section: ApiSection, config = {}) => {
        component = mount(api(section, deepAssign(storyConfigMock, config)));
        return component;
      },
    },

    get: {
      autoDocs: () => component.find(AutoDocs),
    },
  };
};

describe('api section view', () => {
  describe('given metadata with deprecated props', () => {
    it('should display separate table for depreacted props', () => {
      const section = apiBuilder({});
      const driver = testkit();
      driver.when.created(section, {
        component: () => <div />,
        metadata: {
          props: { deprecated: { tags: [{ title: 'deprecated' }] } },
        },
      });

      const autodocs = driver.get.autoDocs();
      expect(autodocs.length).toEqual(2);
    });
  });
});
