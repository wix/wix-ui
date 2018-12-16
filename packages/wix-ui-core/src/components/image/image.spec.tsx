import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { imageDriverFactory } from './image.driver';
import { Image } from './image';
import { reactUniDriver } from 'unidriver';
import { async } from 'q';
import { EMPTY_PIXEL, TEST_SRC } from './fixtures';

describe('Image', () => {
    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()
    const createDriver = testContainer.createUniRenderer(imageDriverFactory);
    
    it('renders image element to dom', async() => {
        const image = createDriver(<Image />);

        const imageElement = await image.element();
        expect((imageElement).tagName).toBe('IMG');
    });

    it('displays provided src or srcset', async () => {
        const image = createDriver(<Image src={TEST_SRC} srcSet={TEST_SRC}/>);
        
        expect(await image.getSrc()).toEqual(TEST_SRC);
        expect(await image.getSrcSet()).toEqual(TEST_SRC);
    });

    it('displays empty pixel when src is not provided', async() => {
        const image = createDriver(<Image src=''/>);

        expect(await image.getSrc()).toEqual(EMPTY_PIXEL);
    });

    it('displays empty pixel when srcset is not provided', async() => {
        const image = createDriver(<Image src=''/>);

        expect(await image.getSrcSet()).toEqual(EMPTY_PIXEL);
    });

    it('displays provided alt', async () => {
        const image = createDriver(<Image alt='blabla'/>);
        
        expect(await image.getAlt()).toEqual('blabla');
    });
    
});