import * as React from 'react';
import {createDriver} from './Video.driver.private';
import {Video} from './';

describe('Video', () => {
    describe('src prop', () => {
      it('should not be present by default', () => {
        const driver = createDriver(<Video/>);
        expect(driver.getSrc()).toBeFalsy();
      });

      it('should set initial value', () => {
        const driver = createDriver(<Video src="https://example.com/video.mp4"/>);
        expect(driver.getSrc()).toBe('https://example.com/video.mp4');
      });
    });

    describe('width prop', () => {
      it('should not be present by default', () => {
        const driver = createDriver(<Video/>);
        expect(driver.getWidth()).toBeFalsy();
      });

      it('should set initial value', () => {
        const driver = createDriver(<Video width={400}/>);
        expect(driver.getWidth()).toBe(400);
      });
    });

    describe('height prop', () => {
      it('should not be present by default', () => {
        const driver = createDriver(<Video/>);
        expect(driver.getHeight()).toBeFalsy();
      });

      it('should set initial value', () => {
        const driver = createDriver(<Video height={225}/>);
        expect(driver.getHeight()).toBe(225);
      });
    });

    describe('playing prop', () => {
      it('should not playing by default', () => {
        const driver = createDriver(<Video/>);
        expect(driver.isAutoPlaying()).toBe(false);
      });

      it('should set initial value', () => {
        const driver = createDriver(<Video playing/>);
        expect(driver.isAutoPlaying()).toBe(true);
      });
    });

    describe('muted prop', () => {
      it('should not be muted by default', () => {
        const driver = createDriver(<Video/>);
        expect(driver.isMuted()).toBe(false);
      });

      it('should set initial value', () => {
        const driver = createDriver(<Video muted/>);
        expect(driver.isMuted()).toBe(true);
      });

      it('should update value', () => {
        const driver = createDriver(<Video muted/>);
        expect(driver.isMuted()).toBe(true);

        driver.setProp('muted', false);
        expect(driver.isMuted()).toBe(false);

        driver.setProp('muted', true);
        expect(driver.isMuted()).toBe(true);
      });
    });
});
