import {create, SheetsManager} from 'jss';
import preset from 'jss-preset-default';

const jss = create(preset());
const sheetManager = new SheetsManager();
const sheetMapper = {};

const atachStyleSheetToDom = (styles, componentId) => {
  const newSheet = jss.createStyleSheet(styles);

  if (sheetMapper[componentId]) {
    sheetManager.unmanage(sheetMapper[componentId]);
  }

  sheetMapper[componentId] = styles;

  sheetManager.add(styles, newSheet);
  sheetManager.manage(styles);

  return newSheet;
};

export const generateClasses = (styles, componentId) => {
  const {classes} = atachStyleSheetToDom(styles, componentId);
  return classes;
};

export const detachStyleSheetFromDom = componentId => {
  sheetManager.unmanage(sheetMapper[componentId]);
  delete sheetMapper[componentId];
};
