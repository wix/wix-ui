import * as React from "react";
import DataTable from "wix-style-react/DataTable";
import { dataTableTestkitFactory } from "wix-style-react/dist/testkit";
import { dataTableTestkitFactory as dataTableEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { dataTableTestkitFactory as dataTablePuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function DataTableWithMandatoryProps() {
  return <DataTable columns={[]} />;
}

function DataTableWithAllProps() {
  return (
    <DataTable
      allowMultiDetailsExpansion
      columns={[
        {
          align: "center",
          infoTooltipProps: {},
          render: (_row, _num) => "text",
          sortDescending: true,
          sortable: true,
          title: "title",
          important: true,
          style: { width: "10px" },
          width: "10px"
        }
      ]}
      data={[{}]}
      dataHook="hook"
      dynamicRowClass={(_rowData, _rowNum) => ""}
      hasMore
      hideHeader
      id="id"
      infiniteScroll
      isRowHighlight={(_rowData, _rowNum) => true}
      isRowSelected={(_rowData, _rowNum) => true}
      itemsPerPage={10}
      loadMore={() => {}}
      loader="loading..."
      onMouseEnterRow={(_rowData, _rowNum) => {}}
      onMouseLeaveRow={(_rowData, _rowNum) => {}}
      onRowClick={(_rowData, _rowNum) => {}}
      rowClass="Class"
      rowDataHook="string"
      rowDetails={(_rowData, _rowNum) => <span />}
      rowVerticalPadding="large"
      scrollElement={document.createElement("div")}
      selectedRowsIds={[1, "2"]}
      showHeaderWhenEmpty
      showLastRowDivider
      skin="neutral"
      thBorder=""
      thBoxShadow=""
      thColor=""
      thFontSize=""
      thHeight=""
      thLetterSpacing=""
      thOpacity=""
      thPadding=""
      useWindow
      virtualized
      virtualizedLineHeight={10}
      virtualizedListRef={_ref => {}}
      virtualizedTableHeight={100}
      width="100"
    />
  );
}

async function testkits() {
  const testkit = dataTableTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = dataTableEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await dataTablePuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
