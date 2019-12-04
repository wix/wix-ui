import * as React from 'react';
import Slider from 'wix-style-react/Slider';
import { sliderTestkitFactory } from 'wix-style-react/dist/testkit';
import { sliderTestkitFactory as sliderEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { sliderTestkitFactory as sliderPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function SliderWithMandatoryProps() {
  return <Slider onChange={() => {}} />;
}

function SliderWithAllProps() {
  return (
    <Slider
      onChange={(_value) => {}}
      allowCross
      dataHook="x"
      disabled
      displayMarks
      displayTooltip
      id=""
      max={1}
      min={1}
      onAfterChange={() => {}}
      pushable
      rtl
      step={1}
      value={1}
    />
  );
}

async function testkits() {
  const testkit = sliderTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = sliderEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sliderPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
