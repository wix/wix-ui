import * as React from "react";
import TableActionCell from "wix-style-react/TableActionCell";
import { tableActionCellTestkitFactory } from "wix-style-react/dist/testkit";
import { tableActionCellTestkitFactory as tableActionCellEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import * as enzyme from "enzyme";

function tableActionCellWithMandatoryProps() {
  return <TableActionCell />;
}

function tableActionCellWithAllProps() {
  return (
    <TableActionCell
      alwaysShowSecondaryActions
      dataHook="hook"
      numOfVisibleSecondaryActions={2}
      popoverMenuProps={{}}
      primaryAction={{
        disabled: true,
        onClick: () => {},
        text: "text",
        theme: "fullblue"
      }}
      upgrade={true}
      secondaryActions={[
        {
          dataHook: "hook",
          disabled: true,
          icon: <div />,
          onClick: () => {},
          text: "text"
        }
      ]}
    />
  );
}

async function testkits() {
  const testkit = tableActionCellTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = tableActionCellEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });
}
