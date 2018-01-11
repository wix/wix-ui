export type PaginationTheme = {
  root: React.CSSProperties,
  navButton: React.CSSProperties,

  // Mode: pages
  pageStrip: React.CSSProperties,
  pageButton: React.CSSProperties,
  currentPage: React.CSSProperties,
  ellipsis: React.CSSProperties,

  // Mode: input
  pageForm: React.CSSProperties,
  pageInput: React.CSSProperties,
  totalPages: React.CSSProperties,

  // Modifiers
  rtl: React.CSSProperties,
  disabled: React.CSSProperties
};

// Responsive layout logic depends on styling defined here and may not work correctly with different styling.
export const core: PaginationTheme = {
  root: {
    display: 'inline-flex',
    userSelect: 'none',
    '&$rtl': {
      flexDirection: 'row-reverse'
    }
  },
  navButton: {
    display: 'inline-flex',
    flexShrink: 0,
    '&:not($disabled)': {
      cursor: 'pointer'
    }
  },
  pageStrip: {
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'center',

    '$rtl > &': {
      flexDirection: 'row-reverse'
    }
  },
  pageButton: {
    display: 'inline-flex',
    flexShrink: 0,
    cursor: 'pointer'
  },
  currentPage: {
    display: 'inline-flex',
    flexShrink: 0
  },
  ellipsis: {
    display: 'inline-flex',
    flexShrink: 0
  },
  pageForm: {
    display: 'flex'
  },
  pageInput: {},
  totalPages: {},
  rtl: {},
  disabled: {}
};
