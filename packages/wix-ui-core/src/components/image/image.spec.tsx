import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {imageDriverFactory} from './image.driver';
import { Image } from './image';
import { reactUniDriver } from 'unidriver';

describe('Image', () => {
    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest()

    const createDriver = testContainer.createUniRenderer(imageDriverFactory);

    const createDriverFromTestContainer = () => {
        const base = reactUniDriver(testContainer.componentNode);
        return imageDriverFactory(base);
    }

    it('renders a default html image element', async() =>{
        const driver = createDriver(<Image />);
        expect(await driver.exists()).toBe(true);
    });

    // it('displays provided src', async() =>{

    // });
    
});