import React from 'react';
import {mount} from 'enzyme';

import StoryPage from './';

class Driver {
  component;

  defaultProps = {
    metadata: {
      displayName: 'componentName',
      props: {}
    },
    config: {},
    component: () => <div/>,
    componentProps: {},
    exampleProps: {},
    examples: null
  }

  when = {
    created: props => this.component = mount(<StoryPage {...{...this.defaultProps, ...props}}/>)
  }

  get = {
    readme: () => this.component.find('[dataHook="metadata-readme"]')
  }
}

const driver = new Driver();

describe('StoryPage', () => {
  it('should render readme', () => {
    driver.when.created();
    expect(driver.get.readme().prop('source')).toMatch(/componentName/);
  });
});
