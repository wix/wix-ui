import * as React from 'react';
import Selector from 'wix-style-react/Selector';
import { selectorTestkitFactory } from 'wix-style-react/dist/testkit';
import { selectorTestkitFactory as selectorEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import * as enzyme from 'enzyme';

function SelectorWithMandatoryProps() {
  return <Selector id="1" title="title" />;
}

function SelectorWithAllProps() {
  const ExtraText = (
    <Selector.ExtraText dataHook="hook" styles="font: 14px" text="text" />
  );

  const Progressbar = (
    <Selector.ProgressBar dataHook="hook" styles="font: 14px" progress={1} />
  );

  return (
    <Selector
      dataHook="hook"
      extraNode={<div />}
      id="1"
      image={<div />}
      imageShape="circle"
      imageSize="cinema"
      isDisabled
      isSelected
      onToggle={_id => {}}
      styles="font: 14px"
      subtitle="text"
      title="title"
      toggleType="checkbox"
    />
  );
}

async function testkits() {
  const testkit = selectorTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = selectorEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });
}
