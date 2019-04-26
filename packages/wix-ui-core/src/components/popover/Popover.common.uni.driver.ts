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
    return (
      (await base.$$(`[data-hook="popover-content"]`)[0]) ||
      body.$(`[data-content-element="${await base.attr('data-content-hook')}"]`)
    );
  };

  return {
    queryDocumentOrElement,
    getContentElement: () => getContentElement(),
  };
};
