import {ElementFinder} from 'wix-ui-test-utils/protractor';

export const googleMapsIframeClientDriverFactory = (component: ElementFinder) => {
  const getButtons = () => component.$$('button');
  const input = component.$('input');
  const resultsElementWrapper = component.$('pre');

  return {
    getParsedResults: async () => {
      const results = await resultsElementWrapper.getText();
      return JSON.parse(results);
    },
    getResultsElementWrapper: () => resultsElementWrapper,
    enterText: (text: string) => {
      input.clear();
      input.sendKeys(text);
    },
    selectByValue: async (value: string) => {
      return await getButtons().getText()
        .then((names: string) => {
          const btnIdx = names.indexOf(value);
          getButtons().get(btnIdx).click();
        });
    },
    element: () => component
  };
};
