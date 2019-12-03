import * as React from "react";
import Table from "wix-style-react/Table";
import { tableTestkitFactory } from "wix-style-react/dist/testkit";
import { tableTestkitFactory as tableEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { tableTestkitFactory as tablePuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function tableWithMandatoryProps() {
  return <Table columns={[]} />;
}

function tableWithAllProps() {
  return (
    <Table
      allowMultiDetailsExpansion
      data={[]}
      dataHook="hook"
      deselectRowsByDefault
      dynamicRowClass={(_rowData, _rowNum) => ""}
      hasMore
      hideBulkSelectionCheckbox
      hideHeader
      id="id"
      infiniteScroll
      isRowHighlight={(_rowData, _rowNum) => true}
      itemsPerPage={10}
      loadMore={() => {}}
      loader="loading..."
      onMouseEnterRow={(_rowData, _rowNum) => {}}
      onMouseLeaveRow={(_rowData, _rowNum) => {}}
      onRowClick={(_rowData, _rowNum) => {}}
      onSelectionChanged={(_selectedIds, change) => {}}
      onSortClick={(_colData, colNum) => {}}
      rowClass="class"
      rowDataHook="hook"
      rowDetails={(_rowData, rowNum) => <span />}
      rowVerticalPadding="large"
      scrollElement={document.createElement("div")}
      selectedIds={[1, 2, 3]}
      selectionDisabled
      showHeaderWhenEmpty
      showLastRowDivider
      showSelection
      skin="neutral"
      totalSelectableCount={12}
      useWindow
      virtualized
      virtualizedLineHeight={10}
      virtualizedListRef={_ref => {}}
      virtualizedTableHeight={10}
      width="10"
      withWrapper
      columns={[
        {
          align: "center",
          important: true,
          infoTooltipProps: {},
          render: (_row, _rowNum) => <span />,
          sortDescending: true,
          sortable: true,
          style: "font: 14px",
          title: <span />,
          width: "10"
        }
      ]}
    />
  );
}

async function testkits() {
  const testkit = tableTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = tableEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await tablePuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
