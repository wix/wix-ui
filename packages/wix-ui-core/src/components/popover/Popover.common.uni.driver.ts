import { UniDriver } from 'wix-ui-test-utils/unidriver';

export const CommonDriver = (base: UniDriver, body: UniDriver ) => {
  const queryDocumentOrElement= async (query: string) => {
     const elm = base.$$(query).get(0);
     if (await elm.exists()) {
       return elm;
     } else {
       return body.$(query);
     }
  }

  return {
    queryDocumentOrElement,
    getContentElement : () =>
      queryDocumentOrElement('[data-hook="popover-content"]')
  }
};
