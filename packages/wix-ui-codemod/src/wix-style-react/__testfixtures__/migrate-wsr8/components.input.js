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
  StatisticsWidget,
  PopoverMenuNext,
} from 'wix-style-react';

export default class extends React.Component {
  render() {
    const otherProps = { one: 1, two: 2, three: 3 };
    return (
      <Page upgrade dataHook="shipping-label-page">
        <Page.Header title="header title" showBackButton={true} />
        <Page.Content>
          <Card>
            <Card.Header withoutDivider={true} />
            <InputWithOptions disableClickOutsideWhenClosed />

            <Card.Content>
              <Tooltip
                appendTo="window"
                content={<div>content</div>}
                {...otherProps}
              >
                <Text>Hover me</Text>
                <CircularProgressBar shouldLoadAsync />
                <LinearProgressBar shouldLoadAsync />
                <Loader shouldLoadAsync />
                <Tag wrap />
                <Popover disableClickOutsideWhenClosed />
                <StatisticsWidget statistics={[]} />
                <PopoverMenuNext flip fixed dataHook="popover-menu" />
              </Tooltip>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header withoutDivider />
            <Text>Awesome text #2</Text>
            <BarChart deprecatedColors />

            <Card.Content>
              <Tooltip appendTo="window" content={<div>content</div>}>
                <DropdownLayout theme="b2b" />
              </Tooltip>

              <Card>
                <Card.Header title="Dont touch me" />
              </Card>

              <Card>
                <Card.Header withoutDivider title="Insert divider here" />
              </Card>
            </Card.Content>
          </Card>
        </Page.Content>
      </Page>
    );
  }
}
