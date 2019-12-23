import * as React from "react";
import ToggleSwitch from "wix-style-react/ToggleSwitch";
import { toggleSwitchTestkitFactory } from "wix-style-react/dist/testkit";
import { toggleSwitchTestkitFactory as toggleSwitchEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import * as enzyme from "enzyme";

function ToggleSwitchWithMandatoryProps() {
  return <ToggleSwitch />;
}

function ToggleSwitchWithAllProps() {
  return (
    <ToggleSwitch
      checked
      dataHook="hook"
      disabled
      onChange={_ev => {}}
      size="large"
      skin="error"
      tabIndex={1}
      id="id"
    />
  );
}

async function testkits() {
  const testkit = toggleSwitchTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = toggleSwitchEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });
}
