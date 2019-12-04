import * as React from 'react';
import CalendarPanel from 'wix-style-react/CalendarPanel';
import { calendarPanelTestkitFactory } from 'wix-style-react/dist/testkit';
import { calendarPanelTestkitFactory as CalendarPanelEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { calendarPanelTestkitFactory as CalendarPanelPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function CalendarPanelWithMandatoryProps() {
  return <CalendarPanel onChange={selectedDays=> {}} />;
}

function CalendarPanelWithAllProps() {
  return (
    <CalendarPanel
      dataHook="hook"
      className="my-class"
      onClose={ _ev => {}}
      excludePastDates={true}
      filterDate={(date: Date) => true}
      value={new Date()}
      selectionMode="day"
      showYearDropdown={false}
      showMonthDropdown={true}
      locale={"en"}
      presets={{selectedDays: "20/01/20", id: "3"}}
      footer={(selectedDays, submitDisabled) => {}}
      onChange={selectedDays=> {}}
    />
  );
}

async function testkits() {
  const testkit = calendarPanelTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = CalendarPanelEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await CalendarPanelPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
