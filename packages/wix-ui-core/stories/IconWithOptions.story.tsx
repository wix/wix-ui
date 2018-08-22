import {IconWithOptions} from '../src/components/IconWithOptions';
import {generateOptions} from '../src/components/DropdownOption/OptionsExample';

const options = generateOptions();

export default {
  category: 'Components',
  storyName: 'IconWithOptions',
  component: IconWithOptions,
  componentPath: '../src/components/IconWithOptions/IconWithOptions.tsx',

  componentProps: {
    'data-hook': 'storybook-iconwithoptions',
    options,
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/caps-hats/512/Ladies_cap-128.png'
  },

  exampleProps: {
    onSelect: ({value}) => `selected ${value}`,
    onDeselect: ({value}) => `deselected ${value}`,

    options: [
      {value: options.slice(0, 1), label: '1 example option'},
      {value: options.slice(0, 5), label: '5 example options'},
      {value: options, label: '20 example options'}
    ]
  }
};
