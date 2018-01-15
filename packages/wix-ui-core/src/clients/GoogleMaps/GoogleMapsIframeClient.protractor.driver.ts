export const googleMapsIframeClientDriverFactory = component => {
  const getButtons = () => component.$$('button');
  const input = component.$('input');
  const resultsElementWrapper = component.$('pre');

  return {
    getParsedResults: async () => {
      const results = await resultsElementWrapper.getText();
      return JSON.parse(results);
    },
    getResultsElementWrapper: () => resultsElementWrapper,
    enterText: text => input.clear().sendKeys(text),
    selectByValue: value => {
      return getButtons().getText()
        .then(names => {
          const btnIdx = names.indexOf(value);
          getButtons().get(btnIdx).click();
        });
    },
    element: () => component
  };
};
