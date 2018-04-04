# `<LabelWithOptions/>`

A dropdown like component, where trigger is text

```js
import {LabelWithOptions} from 'wix-ui-core/LabelWithOptions';

const options = [
  LabelWithOptions.createOption({value: `value0`}),                                         // generates an option with a unique id
  LabelWithOptions.createOption({id: 1, value: `value1`}),                                  // generates an option with id, value
  LabelWithOptions.createOption({id: 2, value: `value2`, isDisabled: true}),                // genrates a disabled option
  LabelWithOptions.createOption({id: 3, value: `value3`, isSelectable: false}),             // generates an unselectable option
  LabelWithOptions.createOption({id: 4, value: `value4`, render: value => value + 's'}),    // generates an option with a custom render function
  LabelWithOptions.createDivider(),                                                         // generates default divider
  LabelWithOptions.createDivider('Value')                                                   // generates a divider with value
];

<LabelWithOptions
  options={options}
  onSelect={option => null}
  onDeselect={option => null}
  initialSelectedIds={null || [1]}
  fixedHeader={'Fixed Header'}
  fixedFooter={'Fixed Footer'}
  disabled={false}
  placeholder={'This is a placeholder'}
  required={false}
  renderSuffix={isError => 'Error!'}
/>
```
