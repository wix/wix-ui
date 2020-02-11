import * as React from 'react';
import { Layout, Cell } from 'wix-style-react/Layout';

function LayoutWithMandatoryProps() {
  return (
    <Layout>
      <Cell />
    </Layout>
  );
}

function LayoutWithAllProps() {
  return (
    <Layout dataHook="hook" gap={30} cols={12}>
      <Cell span={12} vertical>
        <Layout gap="30px">
          <Cell />
        </Layout>
      </Cell>
    </Layout>
  );
}
