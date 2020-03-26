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
  PopoverMenu,
} from 'wix-style-react';

export default class extends React.Component {
  render() {
    const otherProps = { one: 1, two: 2, three: 3 };
    return (
      <Page dataHook="shipping-label-page">
        <Page.Header title="header title" showBackButton={true} />
        <Page.Content>
          <Card>
            <Card.Header>
              <Text>Awesome text</Text>
              <InputWithOptions />
            </Card.Header>
            <Card.Divider />

            <Card.Content>
              <Tooltip
                appendTo="window"
                content={<div>content</div>}
                {...otherProps}
              >
                <Text>Hover me</Text>
                <CircularProgressBar />
                <LinearProgressBar />
                <Loader />
                <Tag />
                <Popover />
                <StatisticsWidget items={[]} />
                <PopoverMenu flip fixed dataHook="popover-menu" />
              </Tooltip>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Text>Awesome text #2</Text>
              <BarChart />
            </Card.Header>
            <Card.Divider />

            <Card.Content>
              <Tooltip appendTo="window" content={<div>content</div>}>
                <DropdownLayout />
              </Tooltip>
            </Card.Content>
          </Card>
        </Page.Content>
      </Page>
    );
  }
}
