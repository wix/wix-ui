import * as React from "react";
import EditableSelector from "wix-style-react/EditableSelector";
import { editableSelectorTestkitFactory } from "wix-style-react/dist/testkit";
import { editableSelectorTestkitFactory as editableSelectorEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { editableSelectorTestkitFactory as editableSelectorPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function EditableSelectorWithMandatoryProps() {
  return <EditableSelector />;
}

function EditableSelectorWithAllProps() {
  return (
    <EditableSelector
      dataHook="hook"
      styles={"font: 10px"}
      title={"title"}
      toggleType={"checkbox"}
      newRowLabel={"some label"}
      editButtonText={"edit"}
      onOptionAdded={_title=>{}}
      onOptionEdit={(_title, _id) => {}}
      onOptionDelete={(_id) => {}}
      onOptionToggle={(_id) => {}}
      options={[{"title": "opt1"}, {"title": "option2", isSelected: true}]}
    />
  );
}

async function testkits() {
  const testkit = editableSelectorTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = editableSelectorEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await editableSelectorPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
