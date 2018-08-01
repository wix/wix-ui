import * as React from 'react';
import {Simulate} from 'react-dom/test-utils';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {addressInputDriverFactory} from './AddressInput.driver';
import {AddressInput, Handler} from './AddressInput';
import {GoogleMapsClientStub} from './GoogleMapsClientStub';
import * as waitForCond from 'wait-for-cond';
import * as eventually from 'wix-eventually';
import * as helper from './AddressInputTestHelper';
import {sleep} from 'wix-ui-test-utils/react-helpers';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {mount} from 'enzyme';
import {addressInputTestkitFactory} from '../../testkit';
import {addressInputTestkitFactory as enzymeAddressInputTestkitFactory} from '../../testkit/enzyme';

describe('AddressInput', () => {
    const container = new ReactDOMTestContainer().unmountAfterEachTest();
    const createDriver = container.createLegacyRenderer(addressInputDriverFactory);

    let driver, onSelectSpy;

    const init = ({handler, ...rest}: any = {}) => {
        GoogleMapsClientStub.reset();
        (GoogleMapsClientStub.prototype.autocomplete as any).mockClear();
        (GoogleMapsClientStub.prototype.geocode as any).mockClear();
        (GoogleMapsClientStub.prototype.placeDetails as any).mockClear();
        onSelectSpy = jest.fn();
        driver = createDriver(
        <AddressInput
          apiKey={helper.API_KEY}
          lang="en"
          Client={GoogleMapsClientStub}
          onSelect={onSelectSpy}
          handler={handler || Handler.geocode}
          throttleInterval={0}
          {...rest}
        />);
    };

    beforeAll(() => {
        jest.spyOn(GoogleMapsClientStub.prototype, 'autocomplete');
        jest.spyOn(GoogleMapsClientStub.prototype, 'geocode');
        jest.spyOn(GoogleMapsClientStub.prototype, 'placeDetails');
    });

    it('Should instantiate client', () => {
        const Client = jest.fn() as any;
        createDriver(<AddressInput apiKey="api-key" lang="en" Client={Client} onSelect={() => null} />);
        expect(Client.mock.instances.length).toBe(1);
    });

    it('Should call MapsClient.autocomplete upon typing', () => {
        init();
        driver.setValue('n');
        expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'n'});
    });

    it('Should throttle calls to MapsClient.autocomplete', async () => {
        init({throttleInterval: 30});

        // For some reason updating the component takes a long time, and we need
        // to use a large throttle interval to make sure it doesn't expire faster
        // than it takes us to update three times.

        driver.setValue('n');
        driver.setValue('ne');
        driver.setValue('new');

        await eventually(() => {
            expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'n'});
            expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'new'});
        }, {interval: 5});
        expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledTimes(2);
    });

    it('Should call MapsClient.autocomplete upon typing, with types', () => {
        const types = ['hello', 'world'];
        init({types});
        driver.setValue('n');
        expect(GoogleMapsClientStub.prototype.autocomplete)
            .toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'n', types});
    });

    it('Should not display results until user typed', () => {
        init();
        driver.click();
        expect(driver.isContentElementExists()).toBeFalsy();
    });

    it('Should display results', async () => {
        init();
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        driver.click();
        driver.setValue('n');
        await waitForCond(() => driver.isContentElementExists());
        expect(helper.getOptionsText(driver)).toEqual([helper.ADDRESS_DESC_1, helper.ADDRESS_DESC_2]);
    });

    it('Should not render location icon by default', async () => {
        init();
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        driver.click();
        driver.setValue('n');
        await waitForCond(() => driver.isContentElementExists());
        const element = driver.optionAt(0).getElement();
        expect(element.querySelector('[data-hook="location-icon-wrapper"]')).toBe(null);
    });

    it('Should render location icon if provided', async () => {
        init({locationIcon: <div data-hook="location-icon"/>});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        driver.click();
        driver.setValue('n');
        await waitForCond(() => driver.isContentElementExists());
        const element = driver.optionAt(0).getElement();
        expect(element.querySelector('[data-hook="location-icon"]')).not.toBe(null);
    });

    it('Should empty suggestion immediately list if string is empty', async () => {
        init();
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
        driver.click();
        driver.setValue('n');
        await waitForCond(() => driver.isContentElementExists());
        driver.setValue('');
        expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledTimes(1);
        expect(driver.isContentElementExists()).toBeFalsy();
    });

    it('Should display results filtered results', async () => {
        init({filterTypes: ['airport']});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        driver.click();
        driver.setValue('n');
        await waitForCond(() => driver.isContentElementExists());
        expect(helper.getOptionsText(driver)).toEqual([helper.ADDRESS_DESC_2]);
    });

    it('Should return all addresses in case filterTypes is an empty array', async () => {
        init({filterTypes: []});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        driver.click();
        driver.setValue('n');
        await waitForCond(() => driver.isContentElementExists());
        expect(helper.getOptionsText(driver)).toEqual([helper.ADDRESS_DESC_1, helper.ADDRESS_DESC_2]);
    });

    it('Should issue a geocode request once an option is chosen', async () => {
        init();
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        GoogleMapsClientStub.setGeocode(helper.GEOCODE_2);

        driver.click();
        driver.setValue('n');

        await waitForCond(() => driver.isContentElementExists());

        driver.optionAt(1).click();
        expect(GoogleMapsClientStub.prototype.geocode).toHaveBeenCalledWith(helper.API_KEY, 'en', {placeId: helper.ADDRESS_2.place_id});
        return eventually(() => {
            expect(onSelectSpy).toHaveBeenCalledWith({
                originValue: helper.ADDRESS_DESC_2,
                googleResult: helper.GEOCODE_2,
                address: helper.INTERNAL_ADDRESS_GEOCODE_2
            });
         }, {interval: 5});
    });

    it('Should append region to geocode request if countryCode prop is set', async () => {
        init({countryCode: 'IL'});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
        GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

        driver.click();
        driver.setValue('n');

        expect(GoogleMapsClientStub.prototype.autocomplete)
            .toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'n', componentRestrictions: {country: 'il'}});

        await waitForCond(() => driver.isContentElementExists());

        driver.optionAt(0).click();
        expect(GoogleMapsClientStub.prototype.geocode).toHaveBeenCalledWith(helper.API_KEY, 'en', {
            placeId: helper.ADDRESS_1.place_id,
            region: 'IL'
        });
    });

    it('Should not append region to placeDetails request even if countryCode prop is set', async () => {
        init({handler: Handler.places, countryCode: 'IL'});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
        GoogleMapsClientStub.setPlaceDetails(helper.PLACE_DETAILS_1);

        driver.click();
        driver.setValue('n');

        await waitForCond(() => driver.isContentElementExists());

        driver.optionAt(0).click();
        expect(GoogleMapsClientStub.prototype.placeDetails).toHaveBeenCalledWith(helper.API_KEY, 'en', {
            placeId: helper.ADDRESS_1.place_id
        });
    });

    it('Should issue a placeDetails request once an option is chosen', async () => {
        init({handler: Handler.places});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        GoogleMapsClientStub.setPlaceDetails(helper.PLACE_DETAILS_2);

        driver.click();
        driver.setValue('n');

        await waitForCond(() => driver.isContentElementExists());

        driver.optionAt(1).click();
        expect(GoogleMapsClientStub.prototype.placeDetails).toHaveBeenCalledWith(helper.API_KEY, 'en', {placeId: helper.ADDRESS_2.place_id});
        return eventually(() => {
            expect(onSelectSpy).toHaveBeenCalledWith({
                originValue: helper.ADDRESS_DESC_2,
                googleResult: helper.PLACE_DETAILS_2,
                address: helper.INTERNAL_ADDRESS_PLACE_DETAILS_2
            });
         }, {interval: 5});
    });

    it('Should try and street number', async () => {
        init();
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
        GoogleMapsClientStub.setGeocode(helper.PLACE_DETAILS_1);

        driver.click();
        driver.setValue('11 n');

        await waitForCond(() => driver.isContentElementExists());

        driver.optionAt(0).click();

        return eventually(() => {
            const firstCallArgument = onSelectSpy.mock.calls[0][0];
            const {address_components} = firstCallArgument.googleResult;
            expect(firstCallArgument.address.number).toBe('11');
            expect(address_components).toEqual([{
                long_name: '11',
                short_name: '11',
                types: [
                    'street_number'
                ]
            }]);
        }, {interval: 5});
    });

    describe('State management', () => {
        it('Should update input value as user types, even if value is set', () => {
            init({value: '1 Ibn Gabirol st.'});
            driver.setValue('n');
            expect(driver.getValue()).toBe('n');
        });
        
        it('Should update input value upon value prop change', () => {
            const wrapper = mount(
                <AddressInput
                    Client={GoogleMapsClientStub}
                    apiKey="a"
                    lang="en"
                    onSelect={() => null}
                    value="123 Ibn Gabirol st."
                />
            );
            
            const addressInputDriver = addressInputDriverFactory({element: wrapper.getDOMNode(), eventTrigger: Simulate});
            addressInputDriver.setValue('n');
            expect(addressInputDriver.getValue()).toBe('n');
            const newValue = '321 Ibn Gabirol st.';
            wrapper.setProps({value: newValue});
            expect(addressInputDriver.getValue()).toBe(newValue);
            addressInputDriver.setValue('n');
            expect(addressInputDriver.getValue()).toBe('n');
            wrapper.setProps({value: newValue});
            expect(addressInputDriver.getValue()).toBe('n');
        });
    });

    describe('Fallback to manual', () => {
        it('Should call onSet (with handler) with raw input if there are no suggestions', () => {
            init({fallbackToManual: true});
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.setValue('n');
            driver.keyDown('Enter');

            return eventually(() => {
                expect(GoogleMapsClientStub.prototype.geocode).toHaveBeenCalledWith(helper.API_KEY, 'en', {address: 'n'});
                expect(onSelectSpy).toHaveBeenCalledWith(expect.objectContaining({
                    googleResult: helper.GEOCODE_1
                }));
            }, {interval: 5});
        });

        it('Should call onSet with null if there are no suggestions and user input is empty', () => {
            init({fallbackToManual: true});
            driver.click();
            driver.setValue('');
            driver.keyDown('Enter');

            return eventually(() => {
                expect(GoogleMapsClientStub.prototype.geocode).not.toHaveBeenCalledWith();
                expect(onSelectSpy).toHaveBeenCalledWith(null);
            }, {interval: 5});
        });

        it('Should not should fall back to geocode when places api is selected and using raw input', () => {
            init({fallbackToManual: true, handler: Handler.places});
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.setValue('n');
            driver.keyDown('Enter');
            return eventually(() => {
                expect(GoogleMapsClientStub.prototype.geocode).toHaveBeenCalledWith(helper.API_KEY, 'en', {address: 'n'});
                expect(onSelectSpy).toHaveBeenCalledWith(expect.objectContaining({
                    googleResult: helper.GEOCODE_1
                }));
            }, {interval: 5});
        });

        it('Should not call onSet in case there are suggestions', async () => {
            init({fallbackToManual: true});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.setValue('n');
            await waitForCond(() => driver.isContentElementExists());
            driver.keyDown('Enter');
            expect(GoogleMapsClientStub.prototype.geocode).not.toHaveBeenCalled();
            expect(onSelectSpy).not.toHaveBeenCalled();
        });

        it('Should not call onSet in case there are pending suggestions', async () => {
            init({fallbackToManual: true});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1], 100);
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.setValue('n');
            driver.keyDown('Enter');
            await sleep(10);
            expect(GoogleMapsClientStub.prototype.geocode).not.toHaveBeenCalled();
            expect(onSelectSpy).not.toHaveBeenCalled();
        });
    });

    describe('Stale requests', () => {
        it('Should ignore stale requests - autocomplete', async () => {
            init({throttleInterval: 0});
            const firstRequest = GoogleMapsClientStub.setAddressesPromise([helper.ADDRESS_1]);
            driver.click();
            driver.setValue('n');

            const secondRequest = GoogleMapsClientStub.setAddressesPromise([helper.ADDRESS_2]);
            driver.click();
            driver.setValue('ne');

            secondRequest.resolve();

            await waitForCond(() => driver.isContentElementExists());

            expect(helper.getOptionsText(driver)).toEqual([helper.ADDRESS_DESC_2]);

            firstRequest.resolve();

            await waitForCond.assertHold(() => {
                expect(helper.getOptionsText(driver)).toEqual([helper.ADDRESS_DESC_2]);
            }, 10, 'Address description changed');
        });

        it('Should ignore stale requests - geocode', async () => {
            init({throttleInterval: 0});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            const firstRequest = GoogleMapsClientStub.setGeocodePromise(helper.GEOCODE_1);
            driver.click();
            driver.setValue('n');
            await helper.waitForSingleOption(helper.ADDRESS_DESC_1, driver);
            driver.optionAt(0).click();

            GoogleMapsClientStub.setAddresses([helper.ADDRESS_2]);
            const secondRequest = GoogleMapsClientStub.setGeocodePromise(helper.GEOCODE_2);
            driver.click();
            driver.setValue('ne');
            await helper.waitForSingleOption(helper.ADDRESS_DESC_2, driver);
            driver.optionAt(0).click();

            secondRequest.resolve();
            firstRequest.resolve();

            return eventually(() => {
                expect(onSelectSpy).toHaveBeenCalledWith({
                    originValue: helper.ADDRESS_DESC_2,
                    googleResult: helper.GEOCODE_2,
                    address: helper.INTERNAL_ADDRESS_GEOCODE_2
                });
                expect(onSelectSpy).toHaveBeenCalledTimes(1);
            }, {interval: 5});
        });

        it('Should ignore stale requests - placeDetails', async () => {
            init({handler: Handler.places});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            const firstRequest = GoogleMapsClientStub.setPlaceDetailsPromise(helper.PLACE_DETAILS_1);
            driver.click();
            driver.setValue('n');
            await helper.waitForSingleOption(helper.ADDRESS_DESC_1, driver);
            driver.optionAt(0).click();

            GoogleMapsClientStub.setAddresses([helper.ADDRESS_2]);
            const secondRequest = GoogleMapsClientStub.setPlaceDetailsPromise(helper.PLACE_DETAILS_2);
            driver.click();
            driver.setValue('ne');
            await helper.waitForSingleOption(helper.ADDRESS_DESC_2, driver);
            driver.optionAt(0).click();

            secondRequest.resolve();
            firstRequest.resolve();

            return eventually(() => {
                expect(onSelectSpy).toHaveBeenCalledWith({
                    originValue: helper.ADDRESS_DESC_2,
                    googleResult: helper.PLACE_DETAILS_2,
                    address: helper.INTERNAL_ADDRESS_PLACE_DETAILS_2
                });
                expect(onSelectSpy).toHaveBeenCalledTimes(1);
            }, {interval: 5});
        });
    });

    describe('Integration with InputWithOptions', () => {
        it('Should pass value prop', () => {
            init({value: 'value'});
            expect(driver.getValue()).toBe('value');
        });

        it('Should pass placeholder prop', () => {
            init({placeholder: 'placeholder'});
            expect(driver.getPlaceholder()).toBe('placeholder');
        });

        it('Should pass readOnly prop (true)', () => {
            init({readOnly: true});
            expect(driver.isReadOnly()).toBeTruthy();
        });

        it('Should pass readOnly prop (false)', () => {
            init({});
            expect(driver.isReadOnly()).toBeFalsy();
        });

        it('Should pass disabled prop (true)', () => {
            init({disabled: true});
            expect(driver.isDisabled()).toBeTruthy();
        });

        it('Should pass disabled prop (false)', () => {
            init({});
            expect(driver.isDisabled()).toBeFalsy();
        });

        it('Should handle onChange event', () => {
            const onChange = jest.fn();
            init({onChange});
            driver.setValue('a');
            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({target: {value: 'a'}}));
        });

        it('Should handle onKeyDown event', () => {
            const onKeyDown = jest.fn();
            init({onKeyDown});
            driver.keyDown('a');
            expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({key: 'a'}));
        });

        it('Should handle onFocus event', () => {
            const onFocus = jest.fn();
            init({onFocus});
            driver.focus();
            expect(onFocus).toHaveBeenCalled();
        });

        it('Should handle onBlur event', () => {
            const onBlur = jest.fn();
            init({onBlur});
            driver.blur();
            expect(onBlur).toHaveBeenCalled();
        });

        it('Should have a focus and blur method', () => {
            const wrapper = mount(
                <AddressInput
                    Client={GoogleMapsClientStub}
                    apiKey="a"
                    lang="en"
                    onSelect={() => null}
                />
            , {attachTo: container.node});

            const input = wrapper.find('input').getDOMNode();
            const instance = wrapper.instance() as AddressInput;

            expect(document.activeElement).not.toBe(input);
            instance.focus();
            expect(document.activeElement).toBe(input);
            instance.blur();
            expect(document.activeElement).not.toBe(input);
        });

        it('Should clear suggestions on blur', async () => {
            init({clearSuggestionsOnBlur: true});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.setValue('n');
            await waitForCond(() => driver.isContentElementExists());
            driver.optionAt(0).click();
            driver.blur();
            await waitForCond(() => !driver.isContentElementExists());
            driver.click();
            expect(driver.isContentElementExists()).toBeFalsy();
        });

        it('Should handle onManualInput', async () => {
            const onManualInput = jest.fn();
            init({onManualInput});
            driver.click();
            driver.setValue('n');
            driver.keyDown('Enter');
            expect(onManualInput).toHaveBeenCalled();
        });

        it('Should pass inline styles', () => {
            const style = {backgroundColor: 'green'};
            init({style});
            expect(driver.inlineStyles()['background-color']).toBe('green')
        });

        it('Should pass ID prop', () => {
            const id = 'my-address-input-id';
            init({id});
            expect(driver.getElementId()).toBe(id);
        })
    });

    describe('Preview states', () => {
        it('Should display content element', () => {
            init({forceContentElementVisibility: true});
            expect(driver.isContentElementExists()).toBeTruthy();
        });

        it('Should display content element', async () => {
            init({forceOptions: [{place_id: 0, description: 'a'}]});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            driver.click();
            driver.setValue('n');
            await waitForCond(() => driver.isContentElementExists());
            expect(helper.getOptionsText(driver)).toEqual(['a']);
        });
    });

    describe('suffix', () => {
        it('Should show suffix', () => {
            init({suffix: <div/>});
            expect(driver.getSuffix()).toBeTruthy();
        });

        it('Should NOT show suffix', () => {
            init();
            expect(driver.getSuffix()).toBeFalsy();
        });
    });

    describe('fixedFooter', () => {
        it('Should show fixedFooter', async () => {
            init({fixedFooter: <div data-hook="fixed-footer"/>});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            driver.click();
            driver.setValue('n');
            await waitForCond(() => driver.isContentElementExists());
            expect(driver.getContentElement().querySelector('[data-hook="fixed-footer"]')).toBeTruthy();
        });

        it('Should NOT show fixedFooter', async () => {
            init();
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            driver.click();
            driver.setValue('n');
            await waitForCond(() => driver.isContentElementExists());
            expect(driver.getContentElement().querySelector('[data-hook="fixed-footer"]')).toBeFalsy();
        });

        it('Should not show fixedFooter when there are no options', () => {
            init({fixedFooter: <div data-hook="fixed-footer"/>});
            driver.click();
            expect(driver.isContentElementExists()).toBeFalsy();
        });
    });

    describe('testkit', () => {
        it('should exist', () => {
            expect(isTestkitExists(
            <AddressInput
              lang="en"
              Client={GoogleMapsClientStub}
              apiKey=""
              onSelect={() => null}
            />, addressInputTestkitFactory)).toBe(true);
        });
    });

    describe('enzyme testkit', () => {
        it('should exist', () => {
            expect(isEnzymeTestkitExists(
            <AddressInput
              lang="en"
              Client={GoogleMapsClientStub}
              apiKey=""
              onSelect={() => null}
            />, enzymeAddressInputTestkitFactory, mount)).toBe(true);
        });
    });
});
