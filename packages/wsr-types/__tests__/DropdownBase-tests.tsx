import * as React from "react";
import DropdownBase from "wix-style-react/DropdownBase";
import { dropdownBaseTestkitFactory } from "wix-style-react/dist/testkit";
import { dropdownBaseTestkitFactory as dropdownBaseEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { dropdownBaseTestkitFactory as dropdownBasePuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function DropdownBaseWithMandatoryProps() {
  return <DropdownBase />;
}

function DropdownBaseWithAllProps() {
  return (
    <DropdownBase
      dataHook="hook"
      appendTo="parent"
      dynamicWidth
      fixed
      flip
      initialSelectedId={1}
      maxHeight="20px"
      maxWidth={20}
      minWidth={10}
      moveBy={{ x: 4, y: 3 }}
      onClickOutside={() => {}}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      onSelect={_option => {}}
      open
      options={[
        {
          disabled: true,
          id: 1,
          linkTo: "foo",
          title: true,
          value: "value"
        }
      ]}
      overflow="overflow"
      placement="top"
      selectedId="1"
      showArrow
      tabIndex={1}
      zIndex={2}
    />
  );
}

function DropdownBaseWithChildrenFn() {
  return (
    <DropdownBase>
      {({ close, delegateKeyDown, open, selectedOption, toggle }) => {
        const {
          disabled,
          id,
          linkTo,
          overrideStyle,
          title,
          value
        } = selectedOption;
        open();
        toggle();
        return (
          <div>
            <button onClick={close} />
            <button onKeyDown={delegateKeyDown} />
          </div>
        );
      }}
    </DropdownBase>
  );
}

async function testkits() {
  const testkit = dropdownBaseTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = dropdownBaseEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await dropdownBasePuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
