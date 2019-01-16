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

     it('specifies the image to cover its container', async() => {
        const imageDriver = createDriver(<Image src={SRC} resizeMode={'container'}/>);

        expect(imageDriver.getStyle).to.have.style('visibility', 'hidden');
        // expect(imageDriver.nativeElement).to.have.style('display', 'block');
        // expect(imageDriver.nativeElement).to.have.style('height', '20px');
     });

    //  it('specifies the image to cover its container.', async() => {
    //     const imageDriver = createDriver(<Image src={SRC} resizeMode={'cover'} />);
    //     expect(true).toBe(true);
    // });

    // it('specifies the image to cover its container.', async() => {
    //     const imageDriver = createDriver(<Image src={SRC} resizeMode={'contain'} />);
    //     expect(true).toBe(true);
    // });

});