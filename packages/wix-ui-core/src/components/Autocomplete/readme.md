# `<Autocomplete/>`

dropdown like component where trigger is input

### Usage example

```js
import {Autocomplete} from 'wix-ui-core/Autocomplete';

const options = [
  Autocomplete.createOption({value: `value0`}),                                         // generates an option with a unique id
  Autocomplete.createOption({id: 1, value: `value1`}),                                  // generates an option with id, value
  Autocomplete.createOption({id: 2, value: `value2`, isDisabled: true}),                // genrates a disabled option
  Autocomplete.createOption({id: 3, value: `value3`, isSelectable: false}),             // generates an unselectable option
  Autocomplete.createOption({id: 4, value: `value4`, render: value => value + 's'}),    // generates an option with a custom render function
  Autocomplete.createDivider(),                                                         // generates default divider
  Autocomplete.createDivider('Value')                                                   // generates a divider with value
];

<Autocomplete
  options={options}
  onSelect={option => null}
  initialSelectedId={null || 1}
  fixedHeader={'Fixed Header'}
  fixedFooter={'Fixed Footer'}
  onManualInput={value => null}
  autoFocus={false}
  disabled={false}
  onBlur={event => null}
  onChange={event => null}
  onFocus={event => null}
  placeholder={'This is a placeholder'}
  error={false || 'Error message'}
  prefix={null}
  suffix={null}
/>
```
