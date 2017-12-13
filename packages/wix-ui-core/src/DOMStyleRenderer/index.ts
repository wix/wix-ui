import {create, SheetsManager} from 'jss';
import preset from 'jss-preset-default';

const jss = create(preset());

if (process.env.NODE_ENV !== 'production') {
  jss.setup({
    createGenerateClassName: (args) => {
      return (rule, sheet) => `${rule.key}`;
    }
  });
}
const sheetManager = new SheetsManager();
const sheetMapper = {};

const atachStyleSheetToDom = (styles, componentId) => {
  const newSheet = jss.createStyleSheet(styles);

  if (sheetMapper[componentId]) {
    detachStyleSheetFromDom(componentId);
  }

  sheetMapper[componentId] = {
    styleElement: newSheet.renderer.element,
    styles
  };

  sheetManager.add(styles, newSheet);
  sheetManager.manage(styles);

  return newSheet;
};

export const generateClasses = (styles, componentId) => {
  const {classes} = atachStyleSheetToDom(styles, componentId);
  return classes;
};

export function detachStyleSheetFromDom(componentId) {
  sheetManager.unmanage(sheetMapper[componentId].styles);
  delete sheetMapper[componentId];
}

export function getStyleElementByComponentId(componentId) {
  if (!sheetMapper[componentId]) {
    throw 'DomStyleRenderer(getStyleElementByComponentId): componentId doesn\'t exists';
  }
  return sheetMapper[componentId].styleElement;
}
