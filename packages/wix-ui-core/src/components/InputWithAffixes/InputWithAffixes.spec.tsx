import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {InputWithAffixes} from './';
import {inputWithAffixesDriverFactory} from './InputWithAffixes.driver';

describe('InputWithAffixes', () => {
    const createDriver = createDriverFactory(inputWithAffixesDriverFactory);
    describe('No affixes', () => {
        it('renders with no prefix or suffix', () => {
            const driver = createDriver(<InputWithAffixes/>);

            expect(driver.exists()).toBeTruthy();
            expect(driver.hasPrefix()).toBeFalsy();
            expect(driver.hasSuffix()).toBeFalsy();
        });

        it('renders the internal Input comp with the correct props', () => {
            const driver = createDriver(<InputWithAffixes disabled/>);

            expect(driver.isDisabled()).toBeTruthy();
        });
    });

    it('should allow adding a custom prefix component', () => {
        const driver = createDriver(<InputWithAffixes prefix={<div data-hook="prefix"/>}/>);

        expect(driver.hasPrefix()).toBeTruthy();
        expect(driver.getPrefix().querySelector('[data-hook="prefix"]')).toBeTruthy();
    });

    it('should allow adding a custom suffix component', () => {
        const driver = createDriver(<InputWithAffixes suffix={<div data-hook="suffix"/>}/>);

        expect(driver.hasSuffix()).toBeTruthy();
        expect(driver.getSuffix().querySelector('[data-hook="suffix"]')).toBeTruthy();
    });

    it('should allow adding a custom prefix and suffix components', () => {
        const driver = createDriver(<InputWithAffixes prefix={<div data-hook="prefix"/>} suffix={<div data-hook="suffix"/>}/>);

        expect(driver.hasSuffix()).toBeTruthy();
        expect(driver.hasPrefix()).toBeTruthy();
        expect(driver.getPrefix().querySelector('[data-hook="prefix"]')).toBeTruthy();
        expect(driver.getSuffix().querySelector('[data-hook="suffix"]')).toBeTruthy();
    });
});
