import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { Video } from './';
import { videoPrivateDriverFactory } from './Video.driver.private';

describe('Video', () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRendererAsync(videoPrivateDriverFactory);

  const VIDEO_ID = 'my-video';
  const VIDEO_SRC = 'data:video/mp4,never-gonna-give-you-up.mp4';
  const IMAGE_SRC = 'data:image/jpeg,never-gonna-run-around.jpg';
  const PLAYABLE_LINK = VIDEO_SRC;
  const YOUTUBE_LINK = 'https://www.youtube.com/watch?v=oUFJJNQGwhk';
  const DAILYMOTION_LINK = 'https://www.dailymotion.com/video/x5e9eog';
  const FACEBOOK_LINK =
    'https://www.facebook.com/facebook/videos/10153231379946729/';
  const TWITCH_LINK = 'https://www.twitch.tv/videos/106400740';
  const VIMEO_LINK = 'https://vimeo.com/90509568';

  describe('Wrapper', () => {
    describe('width prop', () => {
      it('should not be present by default', async () => {
        const driver = await createDriver(
          <Video src={VIDEO_SRC} id={VIDEO_ID} />,
        );
        const native = await driver.getNative();

        expect(native.style.width).toBeFalsy();
      });

      it('should set given value', async () => {
        const driver = await createDriver(
          <Video width={400} src={VIDEO_SRC} id={VIDEO_ID} />,
        );
        const native = await driver.getNative();

        expect(native.style.width).toBe('400px');
      });
    });

    describe('height prop', () => {
      it('should not be present by default', async () => {
        const driver = await createDriver(
          <Video src={VIDEO_SRC} id={VIDEO_ID} />,
        );
        const native = await driver.getNative();

        expect(native.style.height).toBeFalsy();
      });

      it('should set given value', async () => {
        const driver = await createDriver(
          <Video height={225} src={VIDEO_SRC} id={VIDEO_ID} />,
        );
        const native = await driver.getNative();

        expect(native.style.height).toBe('225px');
      });
    });

    describe('fillAllSpace prop', () => {
      it('should set width and height as 100%', async () => {
        const driver = await createDriver(
          <Video fillAllSpace src={VIDEO_SRC} id={VIDEO_ID} />,
        );
        const native = await driver.getNative();

        expect(native.style.width).toBe('100%');
        expect(native.style.height).toBe('100%');
      });
    });

    describe('fillAllSpace prop', () => {
      it('should set width and height as 100%', async () => {
        const driver = await createDriver(
          <Video fillAllSpace src={VIDEO_SRC} id={VIDEO_ID} />,
        );
        const native = await driver.getNative();

        expect(native.style.width).toBe('100%');
        expect(native.style.height).toBe('100%');
      });
    });

    describe('player name', () => {
      it('should change player name when src url changes', async () => {
        class VideoWrapper extends React.Component<any> {
          state = { src: PLAYABLE_LINK };

          setUrl(url) {
            this.setState({ src: url });
          }

          render() {
            return <Video src={this.state.src} id={VIDEO_ID} />;
          }
        }

        let wrapper;
        const driver = await createDriver(
          <VideoWrapper ref={(ref) => (wrapper = ref)} />,
        );

        expect(await driver.getPlayerName()).toBe('Playable');

        wrapper.setUrl(YOUTUBE_LINK);

        expect(await driver.getPlayerName()).toBe('YouTube');
      });
    });
  });

  describe('Playable', () => {
    describe('player name', () => {
      it('should set video url to Playable player', async () => {
        const driver = await createDriver(
          <Video src={PLAYABLE_LINK} id={VIDEO_ID} />,
        );

        expect(await driver.getPlayerName()).toBe('Playable');
      });

      it('should set array of video source to Playable player', async () => {
        const driver = await createDriver(
          <Video src={[PLAYABLE_LINK]} id={VIDEO_ID} />,
        );

        expect(await driver.getPlayerName()).toBe('Playable');
      });
    });

    describe('cover', () => {
      it('should exist', async () => {
        const driver = await createDriver(
          <Video
            config={{
              playable: {
                poster: IMAGE_SRC,
              },
            }}
            src={PLAYABLE_LINK}
            id={VIDEO_ID}
          />,
        );

        expect(await driver.hasCover()).toBeTruthy();
      });

      it('should not render if hideOverlay is provided', async () => {
        const driver = await createDriver(
          <Video
            config={{
              playable: {
                poster: IMAGE_SRC,
              },
            }}
            hideOverlay
            src={PLAYABLE_LINK}
            id={VIDEO_ID}
          />,
        );

        expect(await driver.hasCover()).toBeFalsy();
      });

      it('should not render if autoplay is enabled', async () => {
        const driver = await createDriver(
          <Video
            config={{
              playable: {
                poster: IMAGE_SRC,
              },
            }}
            playing
            src={PLAYABLE_LINK}
            id={VIDEO_ID}
          />,
        );

        expect(await driver.hasCover()).toBeFalsy();
      });
    });

    describe('title', () => {
      it('should has appropriate title', async () => {
        const TITLE = 'Awesome';
        const driver = await createDriver(
          <Video
            config={{
              playable: {
                poster: IMAGE_SRC,
                title: TITLE,
              },
            }}
            src={PLAYABLE_LINK}
            id={VIDEO_ID}
          />,
        );

        expect(await driver.hasTitle()).toBeTruthy();
        expect(await driver.getTitle()).toBe(TITLE);
      });
    });

    describe('playButton', () => {
      it('should exist', async () => {
        const driver = await createDriver(
          <Video
            config={{
              playable: {
                poster: IMAGE_SRC,
                title: 'Awesome',
                playButton: <div data-hook="play-button">Play</div>,
              },
            }}
            src={PLAYABLE_LINK}
            id={VIDEO_ID}
          />,
        );

        expect(await driver.hasPlayButton()).toBeTruthy();
      });
    });
  });

  describe('DailyMotion', () => {
    describe('player name', () => {
      it('should set DailyMotion link to appropriate player', async () => {
        const driver = await createDriver(
          <Video src={DAILYMOTION_LINK} id={VIDEO_ID} />,
        );

        expect(await driver.getPlayerName()).toBe('DailyMotion');
      });
    });
  });

  describe('Facebook', () => {
    describe('player type', () => {
      it('should set Facebook link to appropriate player', async () => {
        const driver = await createDriver(
          <Video src={FACEBOOK_LINK} id={VIDEO_ID} />,
        );

        expect(await driver.getPlayerName()).toBe('Facebook');
      });
    });

    describe('width and height props', () => {
      it('should set appropriate width and height attr to player container', async () => {
        const driver = await createDriver(
          <Video
            fillAllSpace
            width={480}
            height={200}
            src={FACEBOOK_LINK}
            id={VIDEO_ID}
          />,
        );
        const native = await driver.getNative();
        const widthAttr = await driver.getWidthDataAttr();
        const heightAttr = await driver.getHeightDataAttr();

        expect(native.style.width).toBe('100%');
        expect(widthAttr).toBe('480');
        expect(heightAttr).toBe('200');
      });
    });
  });

  describe('Twitch', () => {
    describe('player type', () => {
      it('should set Twitch link to appropriate player', async () => {
        const driver = await createDriver(
          <Video src={TWITCH_LINK} id={VIDEO_ID} />,
        );

        expect(await driver.getPlayerName()).toBe('Twitch');
      });
    });
  });

  describe('Vimeo', () => {
    describe('player type', () => {
      it('should set Vimeo link to appropriate player', async () => {
        const driver = await createDriver(
          <Video src={VIMEO_LINK} id={VIDEO_ID} />,
        );

        expect(await driver.getPlayerName()).toBe('Vimeo');
      });
    });
  });

  describe('Youtube', () => {
    describe('player type', () => {
      it('should set Youtube link to appropriate player', async () => {
        const driver = await createDriver(
          <Video src={YOUTUBE_LINK} id={VIDEO_ID} />,
        );

        expect(await driver.getPlayerName()).toBe('YouTube');
      });
    });
  });
});
