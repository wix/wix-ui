import { UniDriver } from 'unidriver';

export const CommonDriver = (base: UniDriver, body: UniDriver ) => {
  const queryDocumentOrElement= async (query: string) => {
     const fromElement = base.$$(query).get(0);
     
     if (!!(await fromElement.getNative())) {
       return fromElement;
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
