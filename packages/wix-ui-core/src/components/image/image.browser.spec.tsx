import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver';
import { Image } from './image';
import * as eventually from 'wix-eventually';

describe('Image', () => {
    const BROKEN_SRC: string= 'data:image/png;base64,this-is-broken!';
    const ERROR_IMAGE_SRC: string = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'
    const EMPTY_PIXEL: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()
    const createDriver = testContainer.createUniRenderer(imageDriverFactory);
    
    it('it displays the provided errorImage when the src is broken', async () => {
        const onErrorSpy = jest.fn();
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={ERROR_IMAGE_SRC} onError={onErrorSpy} />); 

        await eventually(async() => {
            expect(onErrorSpy).toHaveBeenCalledTimes(1);
            expect(await imageDriver.getSrc()).toEqual(ERROR_IMAGE_SRC);
        })
    });

    it('displays an empty pixel when both src and errorImage are broken', async() => {
        const onErrorSpy = jest.fn();
        const imageDriver = createDriver(<Image src={BROKEN_SRC} errorImage={BROKEN_SRC} onError={onErrorSpy}/>);
        //await imageDriver.simulateLoadingImageError();
      
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

});