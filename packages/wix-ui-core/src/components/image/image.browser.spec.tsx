import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver';
import { Image , ImageStatus} from './image';
import * as eventually from 'wix-eventually';

describe('Image', () => {
    const SRC: string = 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg'
    const BROKEN_SRC: string= 'data:image/png;base64,this-is-broken!';
    const ERROR_IMAGE_SRC: string = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'
    const EMPTY_PIXEL: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()
    const createDriver = testContainer.createUniRenderer(imageDriverFactory);

    it('renders image element to dom', async() => {
        const imageDriver = createDriver(<Image />);
        const imageElement = await imageDriver.element();

        expect((imageElement).tagName).toBe('IMG');
    });

    it('displays a provided alt prop', async () => {
        const imageDriver = createDriver(<Image alt="this is an informative text"/>);

        expect(await imageDriver.getAlt()).toEqual('this is an informative text');
    });

    it('displays image with the provided src', async () => {
        const onLoadSpy = jest.fn()
        const imageDriver = createDriver(<Image src={SRC} onLoad={onLoadSpy}/>);

        expect(await imageDriver.getImageStyleState('loadState')).toEqual('loading');
        await eventually(async() => {
            expect(onLoadSpy).toHaveBeenCalled();
            expect(await imageDriver.getImageStyleState('loadState')).toEqual('loaded');
            expect(await imageDriver.getSrc()).toEqual(SRC);
        })
    });

    it('displays image with the provided srcSet', async () => {
        const onLoadSpy = jest.fn()
        const imageDriver = createDriver(<Image srcSet={SRC} onLoad={onLoadSpy}/>);

        await eventually(async() => {
            expect(onLoadSpy).toHaveBeenCalled();
            expect(await imageDriver.getImageStyleState('loadState')).toEqual('loaded');
            expect(await imageDriver.getSrcSet()).toEqual(SRC);
        })
    });

    it('displays empty pixel when src is not provided', async() => {
        const onLoadSpy = jest.fn()
        const imageDriver = createDriver(<Image onLoad={onLoadSpy}/>); 

        await eventually(async() => {
            expect(onLoadSpy).toHaveBeenCalled();
            expect(await imageDriver.getImageStyleState('loadState')).toEqual('loaded');
            expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
        })
    });

    it('it displays the provided errorImage when the src is broken', async () => {
        const onErrorSpy = jest.fn()
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={ERROR_IMAGE_SRC} onError={onErrorSpy}/>); 

        await eventually(async() => {
            expect(onErrorSpy).toHaveBeenCalled();
            expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
            expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
        })
    });

    it('displays an empty pixel when both src and errorImage are broken', async() => {
        const onErrorSpy = jest.fn()
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={BROKEN_SRC} onError={onErrorSpy}/>);
      
        await eventually(async() => {
            expect(onErrorSpy).toHaveBeenCalled();
            expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
            expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
        });
    });

    it('displays an empty pixel when the provided src is broken and errorImage is not provided ', async() => {
        const onErrorSpy = jest.fn()
        const imageDriver = createDriver(<Image src={BROKEN_SRC} onError={onErrorSpy}/>);

        await eventually(async() => {
            expect(onErrorSpy).toHaveBeenCalled();
            expect(await imageDriver.getImageStyleState('loadState')).toEqual('error');
            expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
        })
     });

    it('specifies the image to contain its container', async() => {
        const imageDriver = createDriver(<Image src={SRC} resizeMode={'contain'} />);

        expect(await imageDriver.getImageStyleState('resizeMode')).toEqual('contain'); 
    });

    it('specifies the image to cover its container', async() => {
        const imageDriver = createDriver(<Image src={SRC} resizeMode={'cover'} />);

        expect(await imageDriver.getImageStyleState('resizeMode')).toEqual('cover'); 
    });

     // 'fill' is the default image behavior
    it('specifies the image to fill its container', async() => {
        const imageDriver = createDriver(<Image src={SRC} resizeMode={'fill'} />);

        expect(await imageDriver.getImageStyleState('resizeMode')).toEqual('fill'); 
        expect(await imageDriver.getSrc()).toEqual(SRC);
    });
});

