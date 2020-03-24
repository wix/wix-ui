import React from 'react';
import { Page, Tooltip, Text } from 'wix-style-react';

export class AutoscrollablePage extends React.Component {
  render() {
    return (
      <Page upgrade>
        <Tooltip
          upgrade
          appendTo="window"
          content="Enter your postal code, so postman can easier send you a mail."
        >
          <Text>Hover me</Text>
        </Tooltip>
      </Page>
    );
  }
}
