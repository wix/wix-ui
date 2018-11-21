import { VideoProps } from './Video';
/**
 * Private driver, will not be exposed in testkit
 */

import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';

export const createDriver = (Component: React.ReactElement<VideoProps>) => {
  let player;

  const ClonedComponent = React.cloneElement(Component, {
    playableRef: r => player = r,
  });

  const wrapper = mount(ClonedComponent);
  const rootDOMNode = wrapper.getDOMNode() as HTMLElement;
  const companyLogoNode = rootDOMNode.querySelector('[data-hook="company-logo"]');
  const containerNode = rootDOMNode.querySelector('[data-hook="player-container"]') as HTMLElement;

  return {
    hasCover: () => wrapper.find('[data-hook="cover"]').length === 1,
    getRootDOMNode: () => rootDOMNode,
    getSrc: () => player.getSrc(),
    getTitle: () => wrapper.find('[data-hook="title"]').text(),
    getWidth: () => containerNode.style.width,
    getHeight: () => containerNode.style.height,
    getLogoSrc: () => companyLogoNode.getAttribute('src'),
    isAutoPlaying: () => player.getAutoPlay(),
    isMuted: () => player.getMute(),
    setProp: (prop, value) => wrapper.setProps({[prop]: value}),
    clickLogo: () => {
      const event = new MouseEvent('click', {bubbles: true});

      companyLogoNode.dispatchEvent(event);
    }
  };
};
