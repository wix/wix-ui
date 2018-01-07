const buttonMinWidth = 20;
const buttonMinHeight = 20;
const buttonPadding = 3;
const buttonMargin = 3;
const buttonFont = '12px/1 Helvetica';

export type PaginationTheme = {
  paginationRoot: React.CSSProperties,
  currentPage: React.CSSProperties,
  pageNumber: React.CSSProperties,
  inputField: React.CSSProperties,
  inputTotalPages: React.CSSProperties
  ellipsis: React.CSSProperties,
  rtl: React.CSSProperties,
  pagesSelection: React.CSSProperties,
  navButton: React.CSSProperties,
  navButtonRtl: React.CSSProperties,
  disabledNavButton: React.CSSProperties
};

const buttonCommon: React.CSSProperties = {
  minWidth: buttonMinWidth,
  minHeight: buttonMinHeight,
  padding: buttonPadding,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: buttonMargin,
  font: buttonFont,
  userSelect: 'none'
};

export const core: PaginationTheme = {
  paginationRoot: {
    background: '#fff',
    display: 'inline-flex',
  },
  rtl: {
    flexDirection: 'row-reverse'
  },
  pagesSelection: {
    display: 'inline-flex'
  },
  currentPage: {
    ...buttonCommon,
    cursor: 'default',
    color: '#607D8B',
    fontWeight: 'bold',
    border: '1px solid transparent',
    outline: 'none'
  },
  pageNumber: {
    ...buttonCommon,
    cursor: 'pointer',
    color: '#2196F3',
    border: '1px solid #BBDEFB',

    '&:hover': {
      backgroundColor: '#E1F5FE'
    },
    '&:active': {
      outline: 'none'
    }
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
  },
  navButton: {
    ...buttonCommon,
    cursor: 'pointer',
    color: '#2196F3',
    border: '1px solid #BBDEFB',
  },
  navButtonRtl: {
    transform: 'scaleX(-1)'
  },
  disabledNavButton: {
    ...buttonCommon,
    color: 'grey',
    border: 'none',
    pointer: 'default'
  }
};
