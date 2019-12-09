import { UniDriver } from 'wix-ui-test-utils/unidriver';

export const CommonDriver = (base: UniDriver, body: UniDriver) => {
  const queryDocumentOrElement = async (query: string) => {
    const elm = base.$$(query).get(0);
    if (await elm.exists()) {
      return elm;
    }
    return body.$(query);
  };

  const getContentElement = async () => {
    const contentHook = await base.attr('data-content-hook');
    const contentSelector = `[data-content-element="${contentHook}"]`;
    return queryDocumentOrElement(contentSelector);
  };

  return {
    queryDocumentOrElement,
    getContentElement,
  };
};
