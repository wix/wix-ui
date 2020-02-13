import * as React from 'react';
import * as moment from 'moment';
import TimePicker from 'wix-style-react/TimeInput';
import { timeInputTestkitFactory } from 'wix-style-react/dist/testkit';
import { timeInputTestkitFactory as timeInputEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { timeInputTestkitFactory as timeInputPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function TimeInputWithMandatoryProps() {
  return <TimePicker/>;
}

function TimeInputWithAllProps() {
  return (
    <TimePicker
    rtl
    disabled
    onChange={(time: moment.Moment) => {}}
    dataHook="dh"
    dashesWhenDisabled
    defaultValue={moment()}
    disableAmPm
    style={{margin: 'auto'}}
    minutesStep={11}
    />
  );
}

async function testkits() {
  const testkit = timeInputTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = timeInputEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await timeInputPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
