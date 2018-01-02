export type BoxCrossAxisAlignment = 'start' | 'center' | 'end';

export type BoxTheme = {
  spacing?: string;
  crossAxisAlignment?: BoxCrossAxisAlignment;
};

export const verticalCore: BoxTheme = {
  spacing: '20px',
  crossAxisAlignment: 'start'
};

export const horizontalCore: BoxTheme = {
  spacing: '0px',
  crossAxisAlignment: 'end'
};
