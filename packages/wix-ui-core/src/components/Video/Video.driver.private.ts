/**
 * Private driver, will not be exposed in testkit
 */

import * as React from 'react';
import {mount} from 'enzyme';

export const createDriver = (Component) => {
  let player;

  const ClonedComponent = React.cloneElement(Component, {
    playableRef: r => player = r,
  });

  const wrapper = mount(ClonedComponent);

  return {
    getSrc: () => player.getSrc(),
    getWidth: () => player.getWidth(),
    getHeight: () => player.getHeight(),
    isAutoPlaying: () => player.getAutoPlay(),
    isMuted: () => player.getMute(),
    setProp: (prop, value) => wrapper.setProps({[prop]: value})
  };
};
