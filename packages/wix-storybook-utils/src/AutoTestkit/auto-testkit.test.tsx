import * as React from 'react';
import { mount } from 'enzyme';
import { AutoTestkit } from './auto-testkit';
import { DriverDocumentationDriver } from './driver-documentation.test';
class AutoTestkitDriver {
  private component;
  private select = hook =>
    this.component.find(`[data-hook="auto-testkit-${hook}"]`);

  when = {
    created: data => {
      this.component = mount(<AutoTestkit component={data} />);
      return this;
    },
  };

  get = {
    driverAt: index => {
      const driverDoc = this.select('driver').at(index);
      return new DriverDocumentationDriver().given.component(driverDoc);
    },
    heading: () => this.select('heading').text(),
    tag: hook => this.select(hook).name(),
    rootClass: () => this.component.childAt(0).props().className,
  };
}

describe('AutoTestkit', () => {
  const component = {
    displayName: 'component',
    drivers: [
      {
        file: 'component.driver.js',
        descriptor: [
          {
            name: 'click',
            args: [],
            type: 'function',
          },
        ],
      },
    ],
  };

  const docs = new AutoTestkitDriver().when.created(component);

  it('has markdown-body class on root element', () => {
    expect(docs.get.rootClass()).toBe('markdown-body');
  });

  describe('heading', () => {
    it('renders', () => {
      expect(docs.get.heading()).toBe(`${component.displayName} Testkits`);
    });

    it('is h1 tag', () => {
      expect(docs.get.tag('heading')).toBe('h1');
    });
  });

  it('has driver documentation tables', () => {
    expect(docs.get.driverAt(0).get.name()).toBe(component.drivers[0].file);
  });
});
