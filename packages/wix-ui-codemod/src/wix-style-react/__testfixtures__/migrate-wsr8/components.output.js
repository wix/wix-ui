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
    const otherProps = { one: 1, two: 2, three: 3, withoutDivider: false };
    return (
      <Page dataHook="shipping-label-page">
        <Page.Header title="header title" showBackButton={true} />
        <Page.Content>
          <Card>
            <Card.Header />
            <InputWithOptions />

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
            <Card.Header />
            <Text>Awesome text #2</Text>
            <BarChart />

            <Card.Content>
              <Tooltip appendTo="window" content={<div>content</div>}>
                <DropdownLayout />
              </Tooltip>

              <Card>
                <Card.Header title="Add divider" />
                <Card.Divider />
              </Card>

              <Card>
                <Card.Header title="No divider" />
              </Card>

              <Card>
                <Card.Header title="Add divider" />
                <Card.Divider />
                <div>something</div>
                <Card.Header title="Add divider" />
                <Card.Divider />
                <Card.Header title="no divider" />
                <Card.Header title="no divider" />
              </Card>
            </Card.Content>
          </Card>
        </Page.Content>
      </Page>
    );
  }
}
