import React from 'react';
import {
  Page,
  Tooltip,
  Text,
  Card,
  DropdownLayout,
  Tag,
  BarChart,
  CircularProgressBar,
  LinearProgressBar,
  Loader,
  InputWithOptions,
  Popover,
} from 'wix-style-react';

export default class extends React.Component {
  render() {
    return (
      <Page upgrade dataHook="shipping-label-page">
        <Page.Header title="header title" showBackButton={true} />
        <Page.Content>
          <Card>
            <Card.Header withoutDivider={true}>
              <Text>Awesome text</Text>
              <InputWithOptions disableClickOutsideWhenClosed />
            </Card.Header>

            <Card.Content>
              <Tooltip appendTo="window" content={<div>content</div>}>
                <Text>Hover me</Text>
                <CircularProgressBar shouldLoadAsync />
                <LinearProgressBar shouldLoadAsync />
                <Loader shouldLoadAsync />
                <Tag wrap />
                <Popover disableClickOutsideWhenClosed />
              </Tooltip>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header withoutDivider>
              <Text>Awesome text #2</Text>
              <BarChart deprecatedColors />
            </Card.Header>

            <Card.Content>
              <Tooltip appendTo="window" content={<div>content</div>}>
                <DropdownLayout theme="b2b" />
              </Tooltip>
            </Card.Content>
          </Card>
        </Page.Content>
      </Page>
    );
  }
}
