import * as React from "react";
import FieldLabelAttributes from "wix-style-react/FieldLabelAttributes";
import { fieldLabelAttributesTestkitFactory } from "wix-style-react/dist/testkit";
import { fieldLabelAttributesTestkitFactory as fieldLabelAttributesEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import * as enzyme from "enzyme";

function FieldLabelAttributesWithMandatoryProps() {
  return <FieldLabelAttributes />;
}

function FieldLabelAttributesWithAllProps() {
  return (
    <FieldLabelAttributes
      appendToParent
      dataHook="hook"
      info={<div />}
      required
      tooltip={<div />}
      styles="font: 14px"
    />
  );
}

async function testkits() {
  const testkit = fieldLabelAttributesTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = fieldLabelAttributesEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });
}
