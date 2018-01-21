export type PaginationTheme = {
  root: React.CSSProperties,

  // Nav buttons
  navButton: React.CSSProperties,
  navButtonFirst: React.CSSProperties,
  navButtonPrevious: React.CSSProperties,
  navButtonNext: React.CSSProperties,
  navButtonLast: React.CSSProperties,

  // Mode: pages
  pageStrip: React.CSSProperties,
  pageButton: React.CSSProperties,
  currentPage: React.CSSProperties,
  gap: React.CSSProperties,

  // Mode: input
  pageForm: React.CSSProperties,
  pageInput: React.CSSProperties,
  totalPages: React.CSSProperties,

  // Modifiers
  disabled: React.CSSProperties
};

// Responsive layout logic depends on styling defined here and may not work correctly with different styling.
export const core: PaginationTheme = {
  root: {
    display: 'inline-flex',
    userSelect: 'none'
  },
  navButton: {
    display: 'inline-flex',
    flexShrink: 0,
    '&:not($disabled)': {
      cursor: 'pointer'
    }
  },
  navButtonFirst: {order: 1},
  navButtonPrevious: {order: 2},
  navButtonNext: {order: 4},
  navButtonLast: {order: 5},
  pageStrip: {
    display: 'flex',
    order: 3,
    justifyContent: 'center',
    overflow: 'hidden'
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
  gap: {
    display: 'inline-flex',
    flexShrink: 0
  },
  pageForm: {
    display: 'flex',
    order: 3
  },
  pageInput: {},
  totalPages: {},
  disabled: {}
};
