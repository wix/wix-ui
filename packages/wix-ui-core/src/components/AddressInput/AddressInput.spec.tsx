import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {addressInputDriverFactory} from './AddressInput.driver';
import {AddressInput, Handler} from './AddressInput';
import {GoogleMapsClientStub} from './GoogleMapsClientStub';
import * as waitForCond from 'wait-for-cond';
import * as eventually from 'wix-eventually';
import * as helper from './AddressInputTestHelper';

describe('AddressInput', () => {
    const createDriver = createDriverFactory(addressInputDriverFactory);
    let driver, onSelectSpy;

    const init = ({handler, ...rest}:any = {}) => {
        GoogleMapsClientStub.reset();
        (GoogleMapsClientStub.prototype.autocomplete as any).mockClear();
        (GoogleMapsClientStub.prototype.geocode as any).mockClear();
        (GoogleMapsClientStub.prototype.placeDetails as any).mockClear();
        onSelectSpy = jest.fn();
        driver = createDriver(<AddressInput
            apiKey={helper.API_KEY}
            lang="en"
            Client={GoogleMapsClientStub}
            onSelect={onSelectSpy}
            handler={handler || Handler.geocode}
            {...rest}
        />);
    };

    beforeAll(() => {
        jest.spyOn(GoogleMapsClientStub.prototype, 'autocomplete');
        jest.spyOn(GoogleMapsClientStub.prototype, 'geocode');
        jest.spyOn(GoogleMapsClientStub.prototype, 'placeDetails');
    });

    beforeEach(() => {
        init();
    });

    it('Should instantiate client', () => {
        const Client = jest.fn() as any;
        createDriver(<AddressInput apiKey="api-key" lang="en" Client={Client} onSelect={() => null} />);
        expect(Client.mock.instances.length).toBe(1);
    });

    it('Should call MapsClient.autocomplete upon typing', () => {
        driver.change('n');
        expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'n'});
    });

    it('Should throttle calls to MapsClient.autocomplete', async () => {
        driver.change('n');
        driver.change('ne');
        driver.change('new');
        await helper.sleep(151);
        expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'n'});
        expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'new'});
        expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledTimes(2);
    });

    it('Should call MapsClient.autocomplete upon typing, with types', () => {
        const types = ['hello', 'world'];
        init({types});
        driver.change('n');
        expect(GoogleMapsClientStub.prototype.autocomplete)
            .toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'n', types});
    });

    it('Should not display results until user typed', () => {
        driver.click();
        expect(driver.isContentElementExists()).toBeFalsy();
    });

    it('Should display results', async () => {
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        driver.click();
        driver.change('n');
        await waitForCond(() => driver.isContentElementExists());
        expect(driver.getOptions()).toEqual([helper.ADDRESS_DESC_1, helper.ADDRESS_DESC_2]);
    });

    it('Should empty suggestion immediately list if string is empty', async () => {
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
        driver.click();
        driver.change('n');
        await waitForCond(() => driver.isContentElementExists());
        driver.change('');
        expect(GoogleMapsClientStub.prototype.autocomplete).toHaveBeenCalledTimes(1);
        expect(driver.isContentElementExists()).toBeFalsy();
    });

    it('Should display results filtered results', async () => {
        init({filterTypes: ['airport']});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        driver.click();
        driver.change('n');
        await waitForCond(() => driver.isContentElementExists());
        expect(driver.getOptions()).toEqual([helper.ADDRESS_DESC_2]);
    });

    it('Should issue a geocode request once an option is chosen', async () => {
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        GoogleMapsClientStub.setGeocode(helper.GEOCODE_2);

        driver.click();
        driver.change('n');

        await waitForCond(() => driver.isContentElementExists());

        driver.clickOptionAt(1);
        expect(GoogleMapsClientStub.prototype.geocode).toHaveBeenCalledWith(helper.API_KEY, 'en', {placeId: helper.ADDRESS_2.place_id});
        return eventually(() => expect(onSelectSpy).toHaveBeenCalledWith({
            originValue: helper.ADDRESS_DESC_2,
            googleResult: helper.GEOCODE_2,
            address: helper.INTERNAL_ADDRESS_GEOCODE_2
        }), {timeout: 1000});
    });

    it('Should append region to geocode request if countryCode prop is set', async () => {
        init({countryCode: 'IL'});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
        GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

        driver.click();
        driver.change('n');

        expect(GoogleMapsClientStub.prototype.autocomplete)
            .toHaveBeenCalledWith(helper.API_KEY, 'en', {input: 'n', componentRestrictions: {country: 'il'}});

        await waitForCond(() => driver.isContentElementExists());

        driver.clickOptionAt(0);
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
        driver.change('n');

        await waitForCond(() => driver.isContentElementExists());

        driver.clickOptionAt(0);
        expect(GoogleMapsClientStub.prototype.placeDetails).toHaveBeenCalledWith(helper.API_KEY, 'en', {
            placeId: helper.ADDRESS_1.place_id
        });
    });

    it('Should issue a placeDetails request once an option is chosen', async () => {
        init({handler: Handler.places});
        GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
        GoogleMapsClientStub.setPlaceDetails(helper.PLACE_DETAILS_2);

        driver.click();
        driver.change('n');

        await waitForCond(() => driver.isContentElementExists());

        driver.clickOptionAt(1);
        expect(GoogleMapsClientStub.prototype.placeDetails).toHaveBeenCalledWith(helper.API_KEY, 'en', {placeId: helper.ADDRESS_2.place_id});
        return eventually(() => expect(onSelectSpy).toHaveBeenCalledWith({
            originValue: helper.ADDRESS_DESC_2,
            googleResult: helper.PLACE_DETAILS_2,
            address: helper.INTERNAL_ADDRESS_PLACE_DETAILS_2
        }), {timeout: 1000});
    });

    describe('Fallback to manual', () => {
        it('Should call onSet (with handler) with raw input if there are no suggestions', () => {
            init({fallbackToManual: true});
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.change('n');
            driver.keyDown('Enter');

            return eventually(() => {
                expect(GoogleMapsClientStub.prototype.geocode).toHaveBeenCalledWith(helper.API_KEY, 'en', {address: 'n'});
                expect(onSelectSpy).toHaveBeenCalledWith(expect.objectContaining({
                    googleResult: helper.GEOCODE_1
                }));
            }, {timeout: 1000});
        });

        it('Should call onSet with null if there are no suggestions and user input is empty', () => {
            init({fallbackToManual: true});
            driver.click();
            driver.change('');
            driver.keyDown('Enter');

            return eventually(() => {
                expect(GoogleMapsClientStub.prototype.geocode).not.toHaveBeenCalledWith();
                expect(onSelectSpy).toHaveBeenCalledWith(null);
            });
        });

        it('Should not should fall back to geocode when places api is selected and using raw input', () => {
            init({fallbackToManual: true, handler: Handler.places});
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.change('n');
            driver.keyDown('Enter');
            return eventually(() => {
                expect(GoogleMapsClientStub.prototype.geocode).toHaveBeenCalledWith(helper.API_KEY, 'en', {address: 'n'});
                expect(onSelectSpy).toHaveBeenCalledWith(expect.objectContaining({
                    googleResult: helper.GEOCODE_1
                }));
            }, {timeout: 1000});
        });

        it('Should not call onSet in case there are suggestions', async () => {
            init({fallbackToManual: true});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.change('n');
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
            driver.change('n');
            driver.keyDown('Enter');
            await helper.sleep(200);
            expect(GoogleMapsClientStub.prototype.geocode).not.toHaveBeenCalled();
            expect(onSelectSpy).not.toHaveBeenCalled();
        });
    });

    describe('Stale requests', () => {
        it('Should ignore stale requests - autocomplete', async () => {
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1], 100);
            driver.click();
            driver.change('n');

            GoogleMapsClientStub.setAddresses([helper.ADDRESS_2], 1);
            driver.change('ne');

            await helper.sleep(250);
            expect(driver.getOptions()).toEqual([helper.ADDRESS_DESC_2]);
        });

        it('Should ignore stale requests - geocode', async () => {
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1, 1000);
            driver.click();
            driver.change('n');
            await helper.waitForSingleOption(helper.ADDRESS_DESC_1, driver);
            driver.clickOptionAt(0);

            GoogleMapsClientStub.setAddresses([helper.ADDRESS_2]);
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_2, 1);
            driver.change('ne');
            await helper.waitForSingleOption(helper.ADDRESS_DESC_2, driver);
            driver.clickOptionAt(0);

            await helper.sleep(250);
            expect(onSelectSpy).toHaveBeenCalledWith({
                originValue: helper.ADDRESS_DESC_2,
                googleResult: helper.GEOCODE_2,
                address: helper.INTERNAL_ADDRESS_GEOCODE_2
            });
            expect(onSelectSpy).toHaveBeenCalledTimes(1);
        });

        it('Should ignore stale requests - placeDetails', async () => {
            init({handler: Handler.places});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1]);
            GoogleMapsClientStub.setPlaceDetails(helper.PLACE_DETAILS_1, 1000);
            driver.click();
            driver.change('n');
            await helper.waitForSingleOption(helper.ADDRESS_DESC_1, driver);
            driver.clickOptionAt(0);

            GoogleMapsClientStub.setAddresses([helper.ADDRESS_2]);
            GoogleMapsClientStub.setPlaceDetails(helper.PLACE_DETAILS_2, 1);
            driver.change('ne');
            await helper.waitForSingleOption(helper.ADDRESS_DESC_2, driver);
            driver.clickOptionAt(0);

            await helper.sleep(250);
            expect(onSelectSpy).toHaveBeenCalledWith({
                originValue: helper.ADDRESS_DESC_2,
                googleResult: helper.PLACE_DETAILS_2,
                address: helper.INTERNAL_ADDRESS_PLACE_DETAILS_2
            });
            expect(onSelectSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('Integration with InputWithOptions', () => {
        it('Should pass value prop', () => {
            init({value: 'value'});
            expect(driver.getValue()).toBe('value');
        });
        
        it('Should pass placeHolder prop', () => {
            init({placeHolder: 'place-holder'});
            expect(driver.getPlaceHolder()).toBe('place-holder');
        });

        it('Should pass readOnly prop', () => {
            init({readOnly: true});
            expect(driver.isDisabled()).toBeTruthy();
        });

        it('Should handle onChange event', () => {
            const onChange = jest.fn();
            init({onChange});
            driver.change('a');
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

        it('Should clear suggestions on blur', async () => {
            init({clearSuggestionsOnBlur: true});
            GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
            GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
            driver.click();
            driver.change('n');
            await waitForCond(() => driver.isContentElementExists());
            driver.clickOptionAt(0);
            driver.blur();
            await waitForCond(() => !driver.isContentElementExists());
            driver.click();
            expect(driver.isContentElementExists()).toBeFalsy();
        });

        it('Should handle onManualInput', async () => {
            const onManualInput = jest.fn();
            init({onManualInput});
            driver.change('n');
            driver.keyDown('Enter');
            expect(onManualInput).toHaveBeenCalled();
        });
    });
});
