export type BoxTheme = VBoxTheme | HBoxTheme;

export type VBoxTheme = {
  boxType: 'vertical'
  spacing?: string
  alignment?: VBoxAlignment
};

export type HBoxTheme = {
  boxType: 'horizontal'
  spacing?: string
  alignment?: HBoxAlignment
};

export type HBoxAlignment = 'top' | 'center' | 'bottom';

export type VBoxAlignment = 'left' | 'center' | 'right';

export const vCore: BoxTheme = {
  boxType: 'vertical',
  spacing: '20px',
  alignment: 'left'
};

export const hCore: BoxTheme = {
  boxType: 'horizontal',
  spacing: '0',
  alignment: 'bottom'
};
