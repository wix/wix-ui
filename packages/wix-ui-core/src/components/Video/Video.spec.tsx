import * as React from 'react';
import {createDriver} from './Video.driver.private';
import {Video} from './';

describe('Video', () => {
  // Since this runs in a browser avoid sending HTTP requests over network.
  const videoUrl = 'data:video/mp4,never-gonna-give-you-up.mp4';
  const videoUrl2 = 'data:video/mp4,never-gonna-let-you-down.mp4';
  const imageUrl = 'data:image/jpeg,never-gonna-run-around.jpg';

    describe('src prop', () => {
      it('should not be present by default', () => {
        const driver = createDriver(<Video/>);
        expect(driver.getSrc()).toBeFalsy();
      });

      it('should set initial value', () => {
        const driver = createDriver(<Video src={videoUrl}/>);
        expect(driver.getSrc()).toBe(videoUrl);
      });

      it('should set array for src', () => {
        const driver = createDriver(<Video src={[videoUrl]}/>);
        expect(driver.getSrc()).toEqual([videoUrl]);
      });

      it('should update value', () => {
        const driver = createDriver(<Video src={videoUrl}/>);
        expect(driver.getSrc()).toBe(videoUrl);

        driver.setProp('src', videoUrl2);
        expect(driver.getSrc()).toBe(videoUrl2);
      });
    });

    describe('width prop', () => {
      it('should not be present by default', () => {
        const driver = createDriver(<Video/>);
        expect(driver.getWidth()).toBeFalsy();
      });

      it('should set initial value', () => {
        const driver = createDriver(<Video width={400}/>);
        expect(driver.getWidth()).toBe('400px');
      });
    });

    describe('height prop', () => {
      it('should not be present by default', () => {
        const driver = createDriver(<Video/>);
        expect(driver.getHeight()).toBeFalsy();
      });

      it('should set initial value', () => {
        const driver = createDriver(<Video height={225}/>);
        expect(driver.getHeight()).toBe('225px');
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

    describe('cover', () => {
      it('should be present', () => {
        const driver = createDriver(<Video poster={imageUrl}/>);
        expect(driver.hasCover()).toBe(true);
      });
    });

    describe('title', () => {
      it('should be present', () => {
        const driver = createDriver(<Video title="Awesome" poster={imageUrl}/>);
        expect(driver.getTitle()).toBe('Awesome');
      });
    });

    describe('fillAllSpace', () => {
      it('should set width and height in 100%', () => {
        const driver = createDriver(<Video fillAllSpace/>);
        expect(driver.getRootDOMNode().style.width).toBe('100%');
        expect(driver.getRootDOMNode().style.height).toBe('100%');
      });
    });

    describe('playButton', () => {
      it('should be presented', () => {
        const driver = createDriver(
          <Video
            poster={imageUrl}
            playButton={<div data-hook="play-button">Play</div>}
          />
        );
        expect(driver.getRootDOMNode().querySelector('[data-hook="play-button"]')).toBeTruthy();
      });
    });

    describe('logo', () => {
      it('should be hidden by default', () => {
        const driver = createDriver(
          <Video />
        );

        expect(driver.getLogoSrc()).toBeFalsy();
      });

      it('should be shown and clickable if callback passed', () => {
        const callback = jest.fn();
        const driver = createDriver(
          <Video onLogoClick={callback} />
        );

        driver.clickLogo();

        expect(callback).toBeCalled();
      });

      it('should be presented', () => {
        const driver = createDriver(
          <Video
            logoUrl={imageUrl}
          />
        );

        expect(driver.getLogoSrc()).toBe(imageUrl);
      });
    });
});