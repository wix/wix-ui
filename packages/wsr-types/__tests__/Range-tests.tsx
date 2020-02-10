import * as React from 'react';
import Range from 'wix-style-react/Range';
import { rangeTestkitFactory } from 'wix-style-react/dist/testkit';
import { rangeTestkitFactory as rangeEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import * as enzyme from 'enzyme';

function RangeWithMandatoryProps() {
  return <Range />;
}

function RangeWithAllProps() {
  return (
    <Range
      required
      info={"info"}
      dataHook={"hook"}
      style={"style"}
      appendToParent
    >
    </Range>
  );
}

async function testkits() {
  const testkit = rangeTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = rangeEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });
}
