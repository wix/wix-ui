/* eslint-disable */

import * as React from 'react';
import { visualize, story, snap } from 'storybook-snapper';
import { Popover } from '../Popover';

visualize('Popover', () => {
  story('floating behaviour', () => {
    snap('flip=enabled', () => (
      <div>
        <Popover shown placement="top" showArrow>
          <Popover.Element>The Element</Popover.Element>
          <Popover.Content>The content</Popover.Content>
        </Popover>
      </div>
    ));
    snap('fixed=enabled', () => (
      <div>
        <Popover shown placement="top" flip={false} fixed showArrow>
          <Popover.Element>The Element</Popover.Element>
          <Popover.Content>The content</Popover.Content>
        </Popover>
      </div>
    ));
  });
});
