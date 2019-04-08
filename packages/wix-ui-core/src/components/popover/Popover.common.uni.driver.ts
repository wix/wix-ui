import { UniDriver } from 'wix-ui-test-utils/unidriver';

export const CommonDriver = (base: UniDriver, body: UniDriver) => {
  const queryDocumentOrElement = async (query: string) => {
    const elm = base.$$(query).get(0);
    // Workaround a UniDriver bug: in this case elm.exists() returns true
    const elmExists = !!(await elm.getNative());
    if (elmExists) {
      return elm;
    }
    return body.$(query);
  };

  return {
    queryDocumentOrElement,
    getContentElement: () =>
      queryDocumentOrElement('[data-hook="popover-content"]'),
  };
};
