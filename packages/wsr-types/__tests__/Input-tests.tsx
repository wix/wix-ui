import * as React from 'react';
import Input from 'wix-style-react/Input';
import { inputTestkitFactory } from 'wix-style-react/dist/testkit';
import { inputTestkitFactory as inputEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { inputTestkitFactory as inputPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function inputWithMandatoryProps() {
  return <Input />;
}

function InputWithAllProps() {
  return (
    <Input
      ariaControls="label"
      ariaDescribedby="label"
      ariaLabel="text"
      autoFocus
      autoSelect
      autocomplete="off"
      className="cls"
      clearButton
      customInput={<span />}
      dataHook="hook"
      defaultValue="value"
      disableEditing
      disabled
      error
      errorMessage="msg"
      forceFocus
      forceHover
      help
      helpMessage="msg"
      hideStatusSuffix
      id="1"
      max={10}
      maxLength={100}
      menuArrow
      min={5}
      name="name"
      noLeftBorderRadius
      noRightBorderRadius
      onBlur={_ev => {}}
      onChange={_ev => {}}
      onClear={_ev => {}}
      onCompositionChange={_isComposing => {}}
      onEnterPressed={_ev => {}}
      onEscapePressed={_ev => {}}
      onFocus={_ev => {}}
      onInputClicked={_ev => {}}
      onKeyDown={_ev => {}}
      onKeyUp={_ev => {}}
      onPaste={_ev => {}}
      onTooltipShow={() => {}}
      placeholder="placeholder"
      prefix={<div />}
      readOnly
      ref={React.createRef()}
      required
      roundInput
      rtl
      size="large"
      status={Input.StatusError}
      statusMessage="msg"
      step={1}
      suffix={<div />}
      tabIndex={0}
      textOverflow="clip"
      theme="amaterial"
      title="title"
      tooltipPlacement="auto"
      type="text"
      updateControlledOnClear
      value="value"
      withSelection>
      <Input.Ticker
        dataHook="hook"
        downDisabled
        upDisabled
        onDown={_ev => {}}
        onUp={_ev => {}}
      />
      <Input.Unit value="asd" />
      <Input.IconAffix dataHook="hook" />
      <Input.Affix value="$" />
      <Input.Group />
    </Input>
  );
}

async function testkits() {
  const testkit = inputTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = inputEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await inputPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
