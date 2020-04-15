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

  story('trigger element fluid', () => {
    snap('fluid=disabled', () => (
      <div style={{ border: '1px solid black' }}>
        <Popover shown placement="top" showArrow>
          <Popover.Element>
            <button style={{ width: '100%' }}>inline</button>
          </Popover.Element>
          <Popover.Content>The content</Popover.Content>
        </Popover>
      </div>
    ));
    snap('fluid=enabled', () => (
      <div style={{ border: '1px solid black' }}>
        <Popover fluid shown placement="top" showArrow>
          <Popover.Element>
            <button style={{ width: '100%' }}>inline</button>
          </Popover.Element>
          <Popover.Content>The content</Popover.Content>
        </Popover>
      </div>
    ));
  });

  story('zIndex', () => {
    snap('should set zindex', () => (
      <div
        style={{
          display: 'block',
          position: 'relative',
          width: '50%',
          height: '50px',
        }}
      >
        <div style={{ position: 'absolute', top: '10px', left: '0px' }}>
          <Popover shown zIndex={3000} flip={false} fixed placement="top">
            <Popover.Element>The Element</Popover.Element>
            <Popover.Content>zIndex 3000</Popover.Content>
          </Popover>
        </div>
        <div
          style={{
            zIndex: 2000,
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: 'lightgray',
            width: '150px',
            height: '50px',
          }}
        >
          zIndex 2000
        </div>
      </div>
    ));
  });
});
