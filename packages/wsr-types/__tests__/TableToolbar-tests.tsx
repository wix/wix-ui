import * as React from 'react';
import { TableToolbar } from 'wix-style-react/TableToolbar';

function TableToolbarWithMandatoryProps() {
  return <TableToolbar>Text</TableToolbar>;
}

function TableToolbarWithAllProps() {
  return (
    <TableToolbar>
      <TableToolbar.ItemGroup position="start">
        <TableToolbar.Item layout="button">
          <TableToolbar.SelectedCount dataHook="hook">
            Text
          </TableToolbar.SelectedCount>
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
      <TableToolbar.ItemGroup position="end">
        <TableToolbar.Item>
          <TableToolbar.Title dataHook="hook">Text</TableToolbar.Title>
        </TableToolbar.Item>
        <TableToolbar.Divider />
        <TableToolbar.Item>
          <TableToolbar.Label>Text</TableToolbar.Label>
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
    </TableToolbar>
  );
}
