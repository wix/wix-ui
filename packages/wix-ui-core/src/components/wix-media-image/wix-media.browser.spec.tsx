import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { wixMediaImageDriverFactory } from './wix-media-image.driver';
import { MediaPlatformItem, WixMediaImage } from './wix-media-image';
import * as imageClientSDK from 'image-client-api/dist/imageClientSDK';
import * as eventually from 'wix-eventually';
import { BROKEN_SRC, ERROR_IMAGE_SRC, SRC } from '../image/test-fixtures';
import { FALLBACK_IMAGE } from '../image';

describe('WixMediaImage', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();
  const createDriver = testContainer.createUniRenderer(wixMediaImageDriverFactory);
  const sourceWidth = 800,
    sourceHeight = 800;
  const WIDTH = 400,
    HEIGHT = 400;
  const mediaPlatformItem: MediaPlatformItem = {
    width: sourceWidth,
    height: sourceHeight,
    uri: '506418dbb019414f951a61670f3255a8.jpg',
  };

  beforeAll(() => {
    jest.spyOn(imageClientSDK, 'getScaleToFillImageURL').mockReturnValue(SRC);
  });

  it('displays image with given media platform item', async () => {
    const wixMediaDriver = createDriver(
      <WixMediaImage
        mediaPlatformItem={mediaPlatformItem}
        width={WIDTH}
        height={HEIGHT}
      />,
    );

    expect(imageClientSDK.getScaleToFillImageURL).toHaveBeenCalledWith(
      mediaPlatformItem.uri,
      mediaPlatformItem.width,
      mediaPlatformItem.height,
      WIDTH,
      HEIGHT,
    );
    expect(await wixMediaDriver.getSrc()).toEqual(SRC);
  });

  it('should use mediaPlatformItem width/height if non provided', async () => {
    const wixMediaDriver = createDriver(
      <WixMediaImage mediaPlatformItem={mediaPlatformItem} />,
    );

    expect(imageClientSDK.getScaleToFillImageURL).toHaveBeenCalledWith(
      mediaPlatformItem.uri,
      mediaPlatformItem.width,
      mediaPlatformItem.height,
      mediaPlatformItem.width,
      mediaPlatformItem.height,
    );
    expect(await wixMediaDriver.getSrc()).toEqual(SRC);
  });

  it('displays an alt prop', async () => {
    imageClientSDK.getScaleToFillImageURL.mockReturnValue(BROKEN_SRC);

    const imageDriver = createDriver(
      <WixMediaImage mediaPlatformItem={mediaPlatformItem} alt={'this is an informative text'}/>,
    );

    expect(await imageDriver.getAlt()).toEqual('this is an informative text');
  });

  it('should invoke onLoad callback when load successfully', async () => {
    imageClientSDK.getScaleToFillImageURL.mockReturnValue(SRC);
    const onLoadSpy = jest.fn();
    const wixMediaDriver = createDriver(
      <WixMediaImage onLoad={onLoadSpy} mediaPlatformItem={mediaPlatformItem} />,
    );

    expect(await wixMediaDriver.isLoading()).toEqual(true);
    await eventually(
      async () => {
        expect(onLoadSpy).toHaveBeenCalled();
        expect(await wixMediaDriver.isLoaded()).toEqual(true);
      },
      { interval: 10 },
    );
  });

  describe('props are not provided', () => {
    it('displays empty pixel when mediaPlatformItem are not provided', async () => {
      const onLoadSpy = jest.fn();
      const wixMediaDriver = createDriver(<WixMediaImage onLoad={onLoadSpy} />);

      await eventually(
        async () => {
          expect(onLoadSpy).toHaveBeenCalled();
          expect(await wixMediaDriver.isLoaded()).toEqual(true);
          expect(await wixMediaDriver.getSrc()).toEqual(FALLBACK_IMAGE);
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
      const wixMediaDriver = createDriver(
        <WixMediaImage
          mediaPlatformItem={mediaPlatformItem}
          errorMediaPlatformItem={mediaPlatformItem}
          onError={onErrorSpy}
        />,
      );

      await eventually(
        async () => {
          expect(onErrorSpy).toHaveBeenCalled();
          expect(await wixMediaDriver.isError()).toEqual(true);
          expect(await wixMediaDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
        },
        { interval: 10 },
      );
    });

    it('displays an empty pixel when both mediaPlatformItem and errorImage are broken', async () => {
      const onErrorSpy = jest.fn();
      const wixMediaDriver = createDriver(
        <WixMediaImage
          mediaPlatformItem={mediaPlatformItem}
          errorMediaPlatformItem={mediaPlatformItem}
          onError={onErrorSpy}
        />,
      );

      await eventually(
        async () => {
          expect(onErrorSpy).toHaveBeenCalled();
          expect(await wixMediaDriver.isError()).toEqual(true);
          expect(await wixMediaDriver.getSrc()).toEqual(FALLBACK_IMAGE);
        },
        { interval: 10 },
      );
    });

    it('displays an empty pixel when the provided mediaPlatformItem is broken and errorImage is not provided ', async () => {
      const onErrorSpy = jest.fn();
      const wixMediaDriver = createDriver(
        <WixMediaImage mediaPlatformItem={mediaPlatformItem} onError={onErrorSpy} />,
      );

      await eventually(
        async () => {
          expect(onErrorSpy).toHaveBeenCalled();
          expect(await wixMediaDriver.isError()).toEqual(true);
          expect(await wixMediaDriver.getSrc()).toEqual(FALLBACK_IMAGE);
        },
        { interval: 10 },
      );
    });
  });
});
