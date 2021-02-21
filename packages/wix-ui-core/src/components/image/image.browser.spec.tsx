import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver.private';
import { Image } from './image';
import { FALLBACK_IMAGE } from './consts';
import { SRC, BROKEN_SRC, ERROR_IMAGE_SRC } from './test-fixtures';
import * as eventually from 'wix-eventually';

describe('Image', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();
  const createDriver = testContainer.createUniRendererAsync(imageDriverFactory);

  it('renders image element to dom', async () => {
    const imageDriver = await createDriver(<Image />);
    const imageElement = await imageDriver.element();

    expect(imageElement.tagName).toBe('IMG');
  });

  describe('renders provided props', () => {
    it('displays an alt prop', async () => {
      const imageDriver = await createDriver(
        <Image alt="this is an informative text" />,
      );

      expect(await imageDriver.getAlt()).toEqual('this is an informative text');
    });

    it('displays image with given src', async () => {
      const onLoadSpy = jest.fn();
      const imageDriver = await createDriver(
        <Image src={SRC} onLoad={onLoadSpy} />,
      );

      expect(await imageDriver.getLoadStatus()).toEqual('loading');
      await eventually(async () => {
        expect(onLoadSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('loaded');
        expect(await imageDriver.getSrc()).toEqual(SRC);
      });
    });

    it('displays image with given srcSet', async () => {
      const onLoadSpy = jest.fn();
      const imageDriver = await createDriver(
        <Image srcSet={SRC} onLoad={onLoadSpy} />,
      );
      await eventually(async () => {
        expect(onLoadSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('loaded');
        expect(await imageDriver.getSrcSet()).toEqual(SRC);
      });
    });

    it('renders provided src, and overrides the nativeProps src', async () => {
      const imageDriver = await createDriver(
        <Image src={SRC} nativeProps={{ src: ERROR_IMAGE_SRC }} />,
      );
      await eventually(async () => {
        expect(await imageDriver.getSrc()).toEqual(SRC);
      });
    });

    it('should render the className on root', async () => {
      const expectedClassName = 'something';
      const imageDriver = await createDriver(
        <Image className={expectedClassName} />,
      );

      expect(await imageDriver.hasClass(expectedClassName)).toBe(true);
    });

    it('should pass the given reference to the native image element', async () => {
      const ref = React.createRef<HTMLImageElement>();
      const expectedSrc = 'something';

      const imageDriver = await createDriver(<Image nativeRef={ref} />);
      ref.current.src = expectedSrc;

      expect(await imageDriver.getSrc()).toEqual(expectedSrc);
    });
  });

  describe('props are not provided', () => {
    it('displays empty pixel when src/srcset are not provided', async () => {
      const onLoadSpy = jest.fn();
      const imageDriver = await createDriver(<Image onLoad={onLoadSpy} />);

      await eventually(async () => {
        expect(onLoadSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('loaded');
        expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
      });
    });
  });

  describe('props are broken', () => {
    it('it displays the provided errorImage when the src is broken', async () => {
      const onErrorSpy = jest.fn();
      const imageDriver = await createDriver(
        <Image
          src={BROKEN_SRC}
          errorImage={ERROR_IMAGE_SRC}
          onError={onErrorSpy}
        />,
      );

      await eventually(async () => {
        expect(onErrorSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('error');
        expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
      });
    });

    it('displays empty pixel when srcSet is broken', async () => {
      const onErrorSpy = jest.fn();
      const imageDriver = await createDriver(
        <Image srcSet={BROKEN_SRC} onError={onErrorSpy} />,
      );

      await eventually(async () => {
        expect(onErrorSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('error');
        expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
      });
    });

    it('it displays the provided errorImage when the src and srcSet are broken', async () => {
      const onErrorSpy = jest.fn();
      const imageDriver = await createDriver(
        <Image
          src={BROKEN_SRC}
          srcSet={BROKEN_SRC}
          errorImage={ERROR_IMAGE_SRC}
          onError={onErrorSpy}
        />,
      );

      await eventually(async () => {
        expect(onErrorSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('error');
        expect(await imageDriver.getSrcSet()).toBeUndefined;
        expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
      });
    });

    it('displays an empty pixel when both src and errorImage are broken', async () => {
      const onErrorSpy = jest.fn();
      const imageDriver = await createDriver(
        <Image src={BROKEN_SRC} errorImage={BROKEN_SRC} onError={onErrorSpy} />,
      );

      await eventually(async () => {
        expect(onErrorSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('error');
        expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
      });
    });

    it('displays an empty pixel when both src and errorImage are broken', async () => {
      const onErrorSpy = jest.fn();
      const imageDriver = await createDriver(
        <Image src={BROKEN_SRC} errorImage={BROKEN_SRC} onError={onErrorSpy} />,
      );

      await eventually(async () => {
        expect(onErrorSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('error');
        expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
      });
    });

    it('displays an empty pixel when the provided src is broken and errorImage is not provided ', async () => {
      const onErrorSpy = jest.fn();
      const imageDriver = await createDriver(
        <Image src={BROKEN_SRC} onError={onErrorSpy} />,
      );

      await eventually(async () => {
        expect(onErrorSpy).toHaveBeenCalled();
        expect(await imageDriver.getLoadStatus()).toEqual('error');
        expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
      });
    });
  });

  describe('resize mode', () => {
    it('specifies the image to contain its container', async () => {
      const imageDriver = await createDriver(
        <Image src={SRC} resizeMode={'contain'} />,
      );

      expect(await imageDriver.getResizeMode()).toEqual('contain');
    });

    it('specifies the image to cover its container', async () => {
      const imageDriver = await createDriver(
        <Image src={SRC} resizeMode={'cover'} />,
      );

      expect(await imageDriver.getResizeMode()).toEqual('cover');
    });

    // 'fill' is the default image behavior
    it('specifies the image to fill its container', async () => {
      const imageDriver = await createDriver(
        <Image src={SRC} resizeMode={'fill'} />,
      );

      expect(await imageDriver.getResizeMode()).toEqual('fill');
      expect(await imageDriver.getSrc()).toEqual(SRC);
    });
  });
});
