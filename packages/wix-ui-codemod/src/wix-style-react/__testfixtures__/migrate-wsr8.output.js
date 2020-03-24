import React from 'react';
import { Page, Tooltip, Text, Card } from 'wix-style-react';

export default class extends React.Component {
  render() {
    return (
      <Page dataHook="shipping-label-page">
        <Page.Header title="header title" showBackButton={true} />
        <Page.Content>
          <Card>
            <Card.Header>
              <Text>Awesome text</Text>
            </Card.Header>
            <Card.Divider />

            <Card.Content>
              <Tooltip appendTo="window" content={<div>content</div>}>
                <Text>Hover me</Text>
              </Tooltip>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Text>Awesome text #2</Text>
            </Card.Header>
            <Card.Divider />

            <Card.Content>
              <Tooltip appendTo="window" content={<div>content</div>}>
                <Text>Hover me</Text>
              </Tooltip>
            </Card.Content>
          </Card>
        </Page.Content>
      </Page>
    );
  }
}
