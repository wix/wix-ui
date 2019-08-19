import { browser } from 'protractor';

import { getStoryUrl, waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { googleMapsIframeClientTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('Google Maps Iframe client', () => {
  const storyUrl = getStoryUrl(Category.COMPONENTS, 'GoogleMapsIframeClient');
  const dataHook = 'story-google-maps-iframe-client';
  const searchTest = 'Broadway';
  const broadwayPlaceId = 'ChIJOSMjjVlWwokRnpaTPyaFi9o';
  const buttonDataHooks = {
    autocompleteApiKey1En: 'autocomplete(apiKey1, en)',
    autocompleteApiKey2En: 'autocomplete(apiKey2, en)',
    autocompleteApiKey2fr: 'autocomplete(apiKey2, fr)',
    geocode: 'geocode',
    placeDetails: 'placeDetails',
  };
  const broadyWayLng = -73.85838059999998;
  const broadwayLat = 41.1115472;
  const allowedDiff = 0.001;

  beforeEach(async () => {
    await browser.get(storyUrl);
  });
  xit('should ask google to autocomplete Broadway and return relevant values', async () => {
    const driver = googleMapsIframeClientTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      driver.element(),
      'Cant find storybook client Component',
    );
    await driver.enterText(searchTest);
    await driver.selectByValue(buttonDataHooks.autocompleteApiKey1En);
    await waitForVisibilityOf(driver.getResultsElementWrapper());

    const parsedResults = await driver.getParsedResults();
    const firstResult = parsedResults[0];
    expect(firstResult.description.includes(searchTest)).toBeTruthy();
  });

  xit('should ask google to geocode Broadway and return relevant values', async () => {
    const driver = googleMapsIframeClientTestkitFactory({ dataHook });
    await waitForVisibilityOf(
      driver.element(),
      'Cant find storybook client Component',
    );
    await driver.enterText(searchTest);
    await driver.selectByValue(buttonDataHooks.geocode);

    await waitForVisibilityOf(driver.getResultsElementWrapper());
    const parsedResults = await driver.getParsedResults();
    const firstResult = parsedResults[0];
    expect(firstResult.formatted_address.includes(searchTest)).toBeTruthy();
    expect(firstResult.geometry.location.lat - broadwayLat).toBeLessThanOrEqual(
      allowedDiff,
    ); //It might be a flaky test due to flaky results in long/lat values
    expect(
      firstResult.geometry.location.lng - broadyWayLng,
    ).toBeLessThanOrEqual(allowedDiff); //It might be a flaky test due to flaky results in long/lat values
  });

  xit('should ask google for placeDetails for broadway and return relevant values', async () => {
    const driver = googleMapsIframeClientTestkitFactory({ dataHook });
    await waitForVisibilityOf(
      driver.element(),
      'Cant find storybook client Component',
    );
    await driver.enterText(broadwayPlaceId);
    await driver.selectByValue(buttonDataHooks.placeDetails);

    await waitForVisibilityOf(driver.getResultsElementWrapper());
    const parsedResults = await driver.getParsedResults();
    const firstResult = parsedResults[0];
    expect(firstResult.name).toEqual(searchTest);
  });
});
