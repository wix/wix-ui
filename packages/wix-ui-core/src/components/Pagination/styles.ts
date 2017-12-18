import {core} from './theme';
import {defaultsDeep} from 'lodash';

const buttonMinWidth = 20;
const buttonMinHeight = 20;
const buttonPadding = 3;
const buttonMargin = 3;
const buttonFont = '12px/1 Helvetica';

export const styles = theme => {
  theme = defaultsDeep(theme, core);

  return {
    root: {
      background: '#fff',
      display: 'flex'
    },
    pageNumber: {
      minWidth: buttonMinWidth,
      minHeight: buttonMinHeight,
      padding: buttonPadding,
      cursor: 'pointer',
      display: 'inline-flex',
      border: '1px solid #BBDEFB',
      alignItems: 'center',
      justifyContent: 'center',
      margin: buttonMargin,
      font: buttonFont,
      color: '#2196F3',
      userSelect: 'none',

      '&:hover': {
          backgroundColor: '#E1F5FE'
      }
    },
    currentPage: {
      minWidth: buttonMinWidth,
      minHeight: buttonMinHeight,
      padding: buttonPadding,
      cursor: 'default',
      display: 'inline-flex',
      border: '1px solid transparent',
      alignItems: 'center',
      justifyContent: 'center',
      margin: buttonMargin,
      font: buttonFont,
      color: '#607D8B',
      fontWeight: 'bold',
      userSelect: 'none'
    },
    inputField: {
      width: '40px',
      minWidth: buttonMinWidth,
      minHeight: buttonMinHeight,
      margin: buttonMargin,
      font: buttonFont,
      color: '#2196F3',
      userSelect: 'none'
    },
    inputTotalPages: {
      width: '40px',
      minWidth: buttonMinWidth,
      minHeight: buttonMinHeight,
      margin: buttonMargin,
      font: buttonFont,
      color: '#2196F3',
      userSelect: 'none'
    },
    ellipsis: {
      minWidth: buttonMinWidth,
      minHeight: buttonMinHeight,
      padding: buttonPadding,
      cursor: 'default',
      display: 'inline-flex',
      border: '1px solid transparent',
      alignItems: 'center',
      justifyContent: 'center',
      margin: buttonMargin,
      font: buttonFont,
      color: '#78909C',
      userSelect: 'none'
    }
  }
}