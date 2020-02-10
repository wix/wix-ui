import * as React from 'react';
import {
  TableToolbar,
  ItemGroup,
  Item,
  Label,
  SelectedCount,
  Title,
  Divider
} from 'wix-style-react/TableToolbar';

function TableToolbarWithMandatoryProps() {
  return <TableToolbar>Text</TableToolbar>;
}

function TableToolbarWithAllProps() {
  return (
    <TableToolbar>
      <ItemGroup position="start">
        <Item layout="button">
          <SelectedCount dataHook="hook">Text</SelectedCount>
        </Item>
      </ItemGroup>
      <ItemGroup position="end">
        <Item>
          <Title dataHook="hook">Text</Title>
        </Item>
        <Divider />
        <Item>
          <Label>Text</Label>
        </Item>
      </ItemGroup>
    </TableToolbar>
  );
}
