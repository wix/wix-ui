import {IconWithOptions} from '../src/components/icon-with-options';
import {generateOptions} from '../src/components/dropdown-option/OptionsExample';

const options = generateOptions();

export default {
  category: 'Components',
  storyName: 'IconWithOptions',
  component: IconWithOptions,
  componentPath: '../src/components/icon-with-options/IconWithOptions.tsx',

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
