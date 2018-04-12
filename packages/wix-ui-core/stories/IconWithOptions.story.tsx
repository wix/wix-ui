import {IconWithOptions} from '../src/components/IconWithOptions';
import {generateOptions} from '../src/baseComponents/DropdownOption/OptionsExample';

export default {
  category: 'Components',
  storyName: 'IconWithOptions',
  component: IconWithOptions,
  componentPath: '../src/components/IconWithOptions/IconWithOptions.tsx',

  componentProps: {
    'data-hook': 'storybook-iconwithoptions',
    options: generateOptions(),
    inputProps: {},
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/caps-hats/512/Ladies_cap-128.png'
  },

  exampleProps: {
    onSelect: ({value}) => `selected ${value}`,
    onDeselect: ({value}) => `deselected ${value}`,
  }
};
