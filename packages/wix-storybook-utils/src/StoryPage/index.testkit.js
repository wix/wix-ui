import React from 'react';
import {mount} from 'enzyme';

import Markdown from '../Markdown';
import StoryPage from './';

export default class {
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
    readme: () =>
      this.component.find('[dataHook="metadata-readme"]'),

    import: () =>
      this.component.find('[dataHook="metadata-import"]').find(Markdown).prop('source')
  }
}
