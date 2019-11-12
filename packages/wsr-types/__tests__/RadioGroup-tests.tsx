import * as React from 'react';
import RadioGroup from 'wix-style-react/RadioGroup';
import { radioGroupTestkitFactory } from 'wix-style-react/dist/testkit';
import { radioGroupTestkitFactory as radioGroupEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function RadioGroupWithMandatoryProps() {
  return <RadioGroup />;
}

function RadioGroupWithAllProps() {
  return (
    <RadioGroup
      dataHook="hook"
      disabled
      disabledRadios={[1, '2']}
      display="horizontal"
      lineHeight="10px"
      onChange={_value => {}}
      selectionArea="always"
      spacing="20px"
      styles="font: 14px"
      type="button"
      vAlign="center"
      value={1}>
      <RadioGroup.Radio
        checked
        content={<div />}
        dataHook="hook"
        disabled
        lineHeight="20px"
        name="name"
        onChange={_value => {}}
        selectionArea="always"
        style={{ paddingTop: '10px' }}
        styles="font: 14px"
        tabIndex={1}
        type="button"
        vAlign="center"
        value="val"
      />
    </RadioGroup>
  );
}

async function testkits() {
  const testkit = radioGroupTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = radioGroupEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });
}
