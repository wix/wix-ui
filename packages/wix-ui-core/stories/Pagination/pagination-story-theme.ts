const button = {
  alignItems: 'center',
  justifyContent: 'center',
  margin: 5,
  padding: 5,
  minWidth: 20,
  minHeight: 20,
  font: '12px/1 Arial, sans-serif'
};

export const theme = {
  root: {
    color: '#455A64',
    backgroundColor: '#ECEFF1'
  },
  navButton: {
    ...button,
    backgroundColor: '#CFD8DC',
    '&$disabled': {
      color: '#B0BEC5',
      backgroundColor: 'transparent'
    }
  },
  pageButton: {
    ...button,
    backgroundColor: '#CFD8DC'
  },
  currentPage: {
    ...button,
    backgroundColor: '#455A64',
    color: '#CFD8DC'
  },
  gap: {
    ...button,
    backgroundColor: '#CFD8DC'
  },
  pageForm: {
    margin: 5,
    alignItems: 'center'
  },
  pageInput: {
    boxSizing: 'border-box',
    height: 30,
    textAlign: 'center',
    font: '12px/1 Arial, sans-serif',
    color: 'inherit'
  }
};
