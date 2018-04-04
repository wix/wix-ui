import React from 'react';
import {mount} from 'enzyme';

import {Option} from '../FormComponents';
import AutoExample from './';

class Driver {
  component;

  constructor(parsedSource) {
    this.parsedSource = parsedSource;
  }

  when = {
    created: props =>
      this.component = mount(
        <AutoExample
          parsedSource={this.parsedSource}
          {...props}
          />
      )
  }

  get = {
    options: () => this.component.find(Option)
  }
}

const parsedSource = {
  props: {
    test: {type: 'string'}
  }
};

const driver = new Driver(parsedSource);

describe('AutoExample', () => {
  it('should have one option', () => {
    driver.when.created();
    expect(driver.get.options().length).toBe(1);
  });
});
