import {create, SheetsManager} from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';

const jss = create(preset());
jss.use(rtl());

const sheetManager = new SheetsManager();
const sheetMapper = {};

const atachStyleSheetToDom = ({styles, componentId, rtl}) => {
  const newSheet = jss.createStyleSheet(styles, {flip: rtl});

  if (sheetMapper[componentId]) {
    sheetManager.unmanage(sheetMapper[componentId]);
  }

  sheetMapper[componentId] = styles;

  sheetManager.add(styles, newSheet);
  sheetManager.manage(styles);

  return newSheet;
};

export const generateClasses = ({styles, componentId, rtl}) => {
  const {classes} = atachStyleSheetToDom({styles, componentId, rtl});
  return classes;
};

export const detachStyleSheetFromDom = componentId => {
  sheetManager.unmanage(sheetMapper[componentId]);
  delete sheetMapper[componentId];
};
