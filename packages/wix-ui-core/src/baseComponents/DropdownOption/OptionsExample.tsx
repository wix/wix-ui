import * as React from 'react';
import {OptionFactory, Option} from '.';

export const generateOptions = (dividerFactory = OptionFactory.createDivider) => {
  const optionsExample =
    Array.from(Array(20))
      .map((x, index) => OptionFactory.create({id: index, value: `value${index}`}));

  optionsExample[2] = OptionFactory.create({id: 2, isDisabled: true, value: 'Disabled item'});
  optionsExample[5] = dividerFactory();
  optionsExample[8].value = 'This is a very very very very very long option';
  optionsExample[12] = dividerFactory({value: 'Divider'});
  optionsExample[13] = OptionFactory.create({id: 13, value: 'Custom Item', render: value => <span style={{color: 'red'}}>{value}</span>});

  return optionsExample;
};
