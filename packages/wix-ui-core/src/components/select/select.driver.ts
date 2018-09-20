export const selectDriverFactory = ({element}) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  return {
    exists: () => !!element,
    getToggle: () => {
      const toggle = byHook('select-toggle');

      toggle.isButton = () => toggle.children[0].localName === 'button';
      toggle.isInput = () => toggle.children[0].localName === 'input';
      toggle.click = () => toggle.children[0].click();
      return toggle;
    },
    getMenu: () => byHook('select-menu')
  };
};
