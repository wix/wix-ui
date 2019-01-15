import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver';
import { Image } from './image';
import * as eventually from 'wix-eventually';

describe('Image', () => {
    const SRC: string = 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg'
    // const SRCSET: string = 'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg'
    const BROKEN_SRC: string= 'data:image/png;base64,this-is-broken!';
    const ERROR_IMAGE_SRC: string = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'
    const EMPTY_PIXEL: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()
    const createDriver = testContainer.createUniRenderer(imageDriverFactory);
    
    it('displays a provided alt prop', async () => {
        const imageDriver = createDriver(<Image alt="blabla"/>);

        expect(await imageDriver.getAlt()).toEqual('blabla');
    });

    it('renders image element to dom', async() => {
        const imageDriver = createDriver(<Image />);
        const imageElement = await imageDriver.element();

        expect((imageElement).tagName).toBe('IMG');
    });

    it('displays image with the provided src', async () => {
        const imageDriver = createDriver(<Image src={SRC}/>);
        
        expect(await imageDriver.getSrc()).toEqual(SRC);
    });

    // it('displays image with the provided srcset, when no src is given', async () => {
    //     const imageDriver = createDriver(<Image src={SRC} srcSet={SRCSET} />);
        
    //     expect(await imageDriver.getSrcSet()).toEqual(SRCSET);
    // });


    it('displays empty pixel when src is not provided', async() => {
        const imageDriver = createDriver(<Image src=""/>);

        expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
    });

    it('it displays the provided errorImage when the src is broken', async () => {
        const onErrorSpy = jest.fn();
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={ERROR_IMAGE_SRC} onError={onErrorSpy} />); 
        await imageDriver.simulateLoadingImageError();

        await eventually(async() => {
            expect(onErrorSpy).toHaveBeenCalledTimes(1);
            expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
        })
    });

    it('displays an empty pixel when both src and errorImage are broken', async() => {
        const onErrorSpy = jest.fn();
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={BROKEN_SRC} onError={onErrorSpy}/>);
        await imageDriver.simulateLoadingImageError();
        await imageDriver.simulateLoadingImageError();
      
        await eventually(async() => {
            expect(onErrorSpy).toHaveBeenCalledTimes(2);
            expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
        });
    });

    it('displays an empty pixel when the provided src is broken and errorImage is not provided ', async() => {
        const onErrorSpy = jest.fn();
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage="" onError={onErrorSpy}/>);
        await imageDriver.simulateLoadingImageError();

        await eventually(async() => {
            expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
        })

     });

    //  it('should render an placeholder', async () => {
    //     const imageDriver = createDriver(<Image placeholder={PLACEHOLDER_AS_TEXT} />);
    //     // expect((await imageDriver.getContentType()) === 'placeholder').toBe(true);
    //   });
});