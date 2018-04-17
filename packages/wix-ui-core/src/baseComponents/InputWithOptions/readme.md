# `<InputWithOptions/>`

A dropdown like component, where trigger is input

### Usage example

```js
import {InputWithOptions} from 'wix-ui-core/InputWithOptions';
import {OptionFactory} from 'wix-ui-core/dist/src/baseComponents/DropdownOption';

const options = [
  OptionFactory.create({value: 'value0'}),                                         // generates an option with a unique id
  OptionFactory.create({id: 1, value: 'value1'}),                                  // generates an option with id, value
  OptionFactory.create({id: 2, value: 'value2', isDisabled: true}),                // genrates a disabled option
  OptionFactory.create({id: 3, value: 'value3', isSelectable: false}),             // generates an unselectable option
  OptionFactory.create({id: 4, value: 'value4', render: value => value + 's'}),    // generates an option with a custom render function
  OptionFactory.createDivider(),                                                   // generates default divider
  OptionFactory.createDivider({className: 'class', value: 'Value'})                // generates a divider with value
];

<InputWithOptions
  placement={'top' || 'bottom' ...}
  options={options}
  openTrigger={'click' || 'hover'}
  onSelect={option => null}
  onDeselect={option => null}
  initialSelectedIds={null || [1]}
  onInitialSelectedOptionsSet={options => null}
  closeOnSelect={true}
  fixedHeader={'Fixed Header'}
  fixedFooter={'Fixed Footer'}
  timeout={150}
  onManualInput={value => null}
  highlightMatches={true}
  forceContentElementVisibility={false}
  inputProps={
    {...inputProps}
  }
/>
```
