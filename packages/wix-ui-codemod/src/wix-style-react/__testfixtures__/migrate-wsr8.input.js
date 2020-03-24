import React from 'react';
import { Page, Tooltip, Text, Card } from 'wix-style-react';

export default class extends React.Component {
  render() {
    return (
      <Page upgrade dataHook="shipping-label-page">
        <Page.Header title="header title" showBackButton={true} />
        <Page.Content>
          <Card>
            <Card.Header withoutDivider={true}>
              <Text>Awesome text</Text>
            </Card.Header>

            <Card.Content>
              <Tooltip appendTo="window" content={<div>content</div>}>
                <Text>Hover me</Text>
              </Tooltip>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header withoutDivider>
              <Text>Awesome text #2</Text>
            </Card.Header>

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
