import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { mediaImageDriverFactory } from './media-image.uni.driver';
import { MediaPlatformItem, MediaImage, MediaImageScaling } from './media-image';
import * as imageClientSDK from 'image-client-api/dist/imageClientSDK';
import * as eventually from 'wix-eventually';
import { BROKEN_SRC, ERROR_IMAGE_SRC, SRC } from '../image/test-fixtures';
import { FALLBACK_IMAGE } from '../image';

describe('MediaImage', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();
  const createDriver = testContainer.createUniRenderer(mediaImageDriverFactory);
  const sourceWidth = 800,
    sourceHeight = 800;
  const WIDTH = 400,
    HEIGHT = 400;
  const mediaPlatformItem: MediaPlatformItem = {
    width: sourceWidth,
    height: sourceHeight,
    uri: '506418dbb019414f951a61670f3255a8.jpg',
  };
  let getScaleToFillImageURL, getScaleToFitImageURL;
  const defaultMediaItemOptions = {};

  beforeAll(() => {
    getScaleToFillImageURL = jest.spyOn(imageClientSDK, 'getScaleToFillImageURL').mockReturnValue(SRC);
    getScaleToFitImageURL = jest.spyOn(imageClientSDK, 'getScaleToFitImageURL').mockReturnValue(SRC);
  });

  it('displays image with given media platform item when fill scale is selected', async () => {
    const mediaImageDriver = createDriver(
      <MediaImage
        mediaPlatformItem={mediaPlatformItem}
        width={WIDTH}
        height={HEIGHT}
      />,
    );

    expect(getScaleToFillImageURL).toHaveBeenCalledWith(
      mediaPlatformItem.uri,
      mediaPlatformItem.width,
      mediaPlatformItem.height,
      WIDTH,
      HEIGHT,
      defaultMediaItemOptions,
    );
    expect(await mediaImageDriver.getSrc()).toEqual(SRC);
  });

  it('displays image with given media platform item when fit scale is selected', async () => {
    const fitImageOptions = {
      focalPoint: {
        x: 0,
        y: 0,
      }
    };
    let fitMediaPlatformItem = { ...mediaPlatformItem, options: fitImageOptions};
    
    const mediaImageDriver = createDriver(
      <MediaImage
        mediaPlatformItem={fitMediaPlatformItem}
        width={WIDTH}
        height={HEIGHT}
        scale={MediaImageScaling.FIT}
      />,
    );

    expect(getScaleToFitImageURL).toHaveBeenCalledWith(
      mediaPlatformItem.uri,
      mediaPlatformItem.width,
      mediaPlatformItem.height,
      WIDTH,
      HEIGHT,
      fitImageOptions,
    );
    expect(await mediaImageDriver.getSrc()).toEqual(SRC);
  });

  it('should use mediaPlatformItem width/height if non provided', async () => {
    const mediaImageDriver = createDriver(
      <MediaImage mediaPlatformItem={mediaPlatformItem} />,
    );

    expect(imageClientSDK.getScaleToFillImageURL).toHaveBeenCalledWith(
      mediaPlatformItem.uri,
      mediaPlatformItem.width,
      mediaPlatformItem.height,
      mediaPlatformItem.width,
      mediaPlatformItem.height,
      defaultMediaItemOptions,
    );
    expect(await mediaImageDriver.getSrc()).toEqual(SRC);
  });

  it('displays an alt prop', async () => {
    imageClientSDK.getScaleToFillImageURL.mockReturnValue(BROKEN_SRC);

    const imageDriver = createDriver(
      <MediaImage
        mediaPlatformItem={mediaPlatformItem}
        alt={'this is an informative text'}
      />,
    );

    expect(await imageDriver.getAlt()).toEqual('this is an informative text');
  });

  it('should invoke onLoad callback when load successfully', async () => {
    imageClientSDK.getScaleToFillImageURL.mockReturnValue(SRC);
    const onLoadSpy = jest.fn();
    const mediaImageDriver = createDriver(
      <MediaImage onLoad={onLoadSpy} mediaPlatformItem={mediaPlatformItem} />,
    );

    expect(await mediaImageDriver.isLoading()).toEqual(true);
    await eventually(
      async () => {
        expect(onLoadSpy).toHaveBeenCalled();
        expect(await mediaImageDriver.isLoaded()).toEqual(true);
      },
      { interval: 10 },
    );
  });

  describe('props are not provided', () => {
    it('displays empty pixel when mediaPlatformItem are not provided', async () => {
      const onLoadSpy = jest.fn();
      const mediaImageDriver = createDriver(<MediaImage onLoad={onLoadSpy} />);

      await eventually(
        async () => {
          expect(onLoadSpy).toHaveBeenCalled();
          expect(await mediaImageDriver.isLoaded()).toEqual(true);
          expect(await mediaImageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
        },
        { interval: 10 },
      );
    });
  });

  describe('props are broken', () => {
    beforeEach(() => {
      imageClientSDK.getScaleToFillImageURL
        .mockReset()
        .mockReturnValueOnce(BROKEN_SRC);
    });

    it('it displays the provided errorImage when mediaPlatformItem is broken', async () => {
      const onErrorSpy = jest.fn();
      imageClientSDK.getScaleToFillImageURL.mockReturnValueOnce(
        ERROR_IMAGE_SRC,
      );
      const mediaImageDriver = createDriver(
        <MediaImage
          mediaPlatformItem={mediaPlatformItem}
          errorMediaPlatformItem={mediaPlatformItem}
          onError={onErrorSpy}
        />,
      );

      await eventually(
        async () => {
          expect(onErrorSpy).toHaveBeenCalled();
          expect(await mediaImageDriver.isError()).toEqual(true);
          expect(await mediaImageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
        },
        { interval: 10 },
      );
    });

    it('displays an empty pixel when both mediaPlatformItem and errorImage are broken', async () => {
      const onErrorSpy = jest.fn();
      const mediaImageDriver = createDriver(
        <MediaImage
          mediaPlatformItem={mediaPlatformItem}
          errorMediaPlatformItem={mediaPlatformItem}
          onError={onErrorSpy}
        />,
      );

      await eventually(
        async () => {
          expect(onErrorSpy).toHaveBeenCalled();
          expect(await mediaImageDriver.isError()).toEqual(true);
          expect(await mediaImageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
        },
        { interval: 10 },
      );
    });

    it('displays an empty pixel when the provided mediaPlatformItem is broken and errorImage is not provided ', async () => {
      const onErrorSpy = jest.fn();
      const mediaImageDriver = createDriver(
        <MediaImage
          mediaPlatformItem={mediaPlatformItem}
          onError={onErrorSpy}
        />,
      );

      await eventually(
        async () => {
          expect(onErrorSpy).toHaveBeenCalled();
          expect(await mediaImageDriver.isError()).toEqual(true);
          expect(await mediaImageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
        },
        { interval: 10 },
      );
    });
  });
});
