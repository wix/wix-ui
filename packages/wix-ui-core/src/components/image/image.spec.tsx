import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver';
import { Image } from './image';
// import * as eventually from 'wix-eventually';

describe('Image', () => {
    const SRC: string = 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg'
    const SRCSET: string = 'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg'
    const BROKEN_SRC: string= 'data:image/png;base64,this-is-broken!';
    const ERROR_IMAGE_SRC: string = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'
    const EMPTY_PIXEL: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()
    const createDriver = testContainer.createUniRenderer(imageDriverFactory);
    
    it('displays a provided alt prop', async () => {
        const image = createDriver(<Image alt="blabla"/>);

        expect(await image.getAlt()).toEqual('blabla');
    });

    it('renders image element to dom', async() => {
        const image = createDriver(<Image />);
        const imageElement = await image.element();

        expect((imageElement).tagName).toBe('IMG');
    });

    it('displays image with the provided src', async () => {
        const image = createDriver(<Image src={SRC}/>);
        
        expect(await image.getSrc()).toEqual(SRC);
    });

    it('displays image with the provided srcset, when no src is given', async () => {
        const image = createDriver(<Image src={SRC} srcSet={SRCSET} />);
        
        expect(await image.getSrcSet()).toEqual(SRCSET);
    });


    it('displays empty pixel when src is not provided', async() => {
        const image = createDriver(<Image src=""/>);

        expect(await image.getSrc()).toEqual(EMPTY_PIXEL);
    });

    it('it displays the provided errorImage when the src is broken', async () => {
        const onErrorSpy = jest.fn();
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={ERROR_IMAGE_SRC} onError={onErrorSpy} />); 
        await imageDriver.simulateLoadingImageError();

        expect(onErrorSpy).toHaveBeenCalledTimes(1);
        expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
    });

    it('when both src and errorImage are broken - it displays an empty pixel', async() => {
        const onErrorSpy = jest.fn();
        const image = createDriver(<Image src={BROKEN_SRC} errorImage={BROKEN_SRC} onError={onErrorSpy}/>);
        await image.simulateLoadingImageError();
        await image.simulateLoadingImageError();
        
        expect(onErrorSpy).toHaveBeenCalledTimes(2);
        expect(await image.getSrc()).toEqual(EMPTY_PIXEL);
        // await eventually(() => {
    
        // });
    });

    it('when provided src is broken and errorImage is not provided - it displays an empty pixel', async() => {
        const onErrorSpy = jest.fn();
        const image = createDriver(<Image src={BROKEN_SRC} errorImage="" onError={onErrorSpy}/>);
        await image.simulateLoadingImageError();

        expect(await image.getSrc()).toEqual(EMPTY_PIXEL);
     });
});