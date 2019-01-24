import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver';
import { Image, FALLBACK_IMAGE } from './image';
import { SRC, BROKEN_SRC, ERROR_IMAGE_SRC } from './test-fixtures'
import * as eventually from 'wix-eventually';

describe('Image', () => {
    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()
    const createDriver = testContainer.createUniRenderer(imageDriverFactory);

    it('renders image element to dom', async () => {
        const imageDriver = createDriver(<Image />);
        const imageElement = await imageDriver.element();

        expect((imageElement).tagName).toBe('IMG');
    });

    describe('renders provided props', () => {
        it('displays an alt prop', async () => {
            const imageDriver = createDriver(<Image alt="this is an informative text" />);

            expect(await imageDriver.getAlt()).toEqual('this is an informative text');
        });

        it('displays image with given src', async () => {
            const onLoadSpy = jest.fn()
            const imageDriver = createDriver(<Image src={SRC} onLoad={onLoadSpy} />);

            expect(await imageDriver.getImageStyleState('loadState')).toEqual('loading');
            await eventually(async () => {
                expect(onLoadSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('loaded');
                expect(await imageDriver.getSrc()).toEqual(SRC);
            })
        });

        it('displays image with given srcSet', async () => {
            const onLoadSpy = jest.fn()
            const imageDriver = createDriver(<Image srcSet={SRC} onLoad={onLoadSpy} />);
            await eventually(async () => {
                expect(onLoadSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('loaded');
                expect(await imageDriver.getSrcSet()).toEqual(SRC);
            })
        });
    });

    describe('props are not provided', () => {
        it('displays empty pixel when src/srcset are not provided', async () => {
            const onLoadSpy = jest.fn()
            const imageDriver = createDriver(<Image onLoad={onLoadSpy} />);

            await eventually(async () => {
                expect(onLoadSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('loaded');
                expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
            })
        });
    });

    describe('props are broken', () => {
        it('it displays the provided errorImage when the src is broken', async () => {
            const onErrorSpy = jest.fn()
            const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={ERROR_IMAGE_SRC} onError={onErrorSpy} />);

            await eventually(async () => {
                expect(onErrorSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
                expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
            })
        });

        it('displays empty pixel when srcSet is broken', async () => {
            const onErrorSpy = jest.fn()
            const imageDriver = createDriver(<Image srcSet={BROKEN_SRC} onError={onErrorSpy} />);

            await eventually(async () => {
                expect(onErrorSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
                expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
            })
        });

        it('it displays the provided errorImage when the src and srcSet are broken', async () => {
            const onErrorSpy = jest.fn()
            const imageDriver = createDriver(<Image src={BROKEN_SRC} srcSet={BROKEN_SRC} errorImage={ERROR_IMAGE_SRC} onError={onErrorSpy} />);

            await eventually(async () => {
                expect(onErrorSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
                expect(await imageDriver.getSrcSet()).toBeUndefined;
                expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
            })
        });

        it('displays an empty pixel when both src and errorImage are broken', async () => {
            const onErrorSpy = jest.fn()
            const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={BROKEN_SRC} onError={onErrorSpy} />);

            await eventually(async () => {
                expect(onErrorSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
                expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
            });
        });

        it('displays an empty pixel when both src and errorImage are broken', async () => {
            const onErrorSpy = jest.fn()
            const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={BROKEN_SRC} onError={onErrorSpy} />);

            await eventually(async () => {
                expect(onErrorSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
                expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
            });
        });

        it('displays an empty pixel when the provided src is broken and errorImage is not provided ', async () => {
            const onErrorSpy = jest.fn()
            const imageDriver = createDriver(<Image src={BROKEN_SRC} onError={onErrorSpy} />);

            await eventually(async () => {
                expect(onErrorSpy).toHaveBeenCalled();
                expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
                expect(await imageDriver.getSrc()).toEqual(FALLBACK_IMAGE);
            })
        });
    });

    describe('resize mode', () => {
        it('specifies the image to contain its container', async () => {
            const imageDriver = createDriver(<Image src={SRC} resizeMode={'contain'} />);

            expect(await imageDriver.getImageStyleState('resizeMode')).toEqual('contain');
        });

        it('specifies the image to cover its container', async () => {
            const imageDriver = createDriver(<Image src={SRC} resizeMode={'cover'} />);

            expect(await imageDriver.getImageStyleState('resizeMode')).toEqual('cover');
        });

        // 'fill' is the default image behavior
        it('specifies the image to fill its container', async () => {
            const imageDriver = createDriver(<Image src={SRC} resizeMode={'fill'} />);

            expect(await imageDriver.getImageStyleState('resizeMode')).toEqual('fill');
            expect(await imageDriver.getSrc()).toEqual(SRC);
        });
    });
});

