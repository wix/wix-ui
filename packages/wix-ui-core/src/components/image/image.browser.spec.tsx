import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver';
import { Image } from './image';
import * as eventually from 'wix-eventually';

describe('Image', () => {
    const SRC: string = 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg'
    const BROKEN_SRC: string= 'data:image/png;base64,this-is-broken!';
    const ERROR_IMAGE_SRC: string = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'
    const EMPTY_PIXEL: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()
    const createDriver = testContainer.createUniRenderer(imageDriverFactory);
    
    it('displays a provided alt prop', async () => {
        const imageDriver = createDriver(<Image alt="this is an informative text"/>);

        expect(await imageDriver.getAlt()).toEqual('this is an informative text');
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

    it('displays empty pixel when src is not provided', async() => {
        const imageDriver = createDriver(<Image src=""/>);

        expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
    });

    it('it displays the provided errorImage when the src is broken', async () => {
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={ERROR_IMAGE_SRC} />); 

        await eventually(async() => {
            expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
        })
    });

    it('displays an empty pixel when both src and errorImage are broken', async() => {
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={BROKEN_SRC}/>);
      
        await eventually(async() => {
            expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
        });
    });

    it('displays an empty pixel when the provided src is broken and errorImage is not provided ', async() => {
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage="" />);

        await eventually(async() => {
            expect(await imageDriver.getSrc()).toEqual(EMPTY_PIXEL);
        })
     });

    it('specifies the image to contain its container', async() => {
        const imageDriver = createDriver(<Image src={SRC}  resizeMode={'contain'} />);
        const imageWrapper = await imageDriver.nativeElement();
        const image = imageWrapper.firstElementChild;

        expect(imageDriver.resized(image)).toEqual('contain'); 
    });

    it('specifies the image to cover its container', async() => {
        const imageDriver = createDriver(<Image src={SRC} resizeMode={'cover'} />);
        const imageWrapper = await imageDriver.nativeElement();
        const image = imageWrapper.firstElementChild;

        expect(imageDriver.resized(image)).toEqual('fit'); 
    });

     // 'fill' is the default image behavior
    it('specifies the image to fill its container', async() => {
        const imageDriver = createDriver(<Image src={SRC} resizeMode={'fill'} />);
        const image = await imageDriver.nativeElement();

        expect(imageDriver.resized(image)).toEqual('fill'); 
        expect(await imageDriver.getSrc()).toEqual(SRC);
    });
});