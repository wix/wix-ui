export type BoxTheme = VBoxTheme | HBoxTheme;

export type VBoxTheme = {
  vertical?: Vertical
  spacing?: string
  alignment?: VBoxAlignment
};

export type HBoxTheme = {
  vertical?: Vertical
  spacing?: string
  alignment?: HBoxAlignment
};

export type Vertical = boolean;

export type HBoxAlignment = 'top' | 'center' | 'bottom';

export type VBoxAlignment = 'left' | 'center' | 'right';

export const vCore: BoxTheme = {
  vertical: true,
  spacing: '20px',
  alignment: 'left'
};

export const hCore: BoxTheme = {
  vertical: false,
  spacing: '0',
  alignment: 'bottom'
};
