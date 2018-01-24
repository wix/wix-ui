export type SliderTheme = Partial<{
  color: string;
  handleSize: number;
  handleBorderColor: string;
  handleBorderWidth: string;
  handleMarginTop: string;
  handleRadius: string;
  handleBackground: string;
  trackWidth: string;
  trackHeight: string;
  trackBackground: string;
  trackOpacity: string;
  trackRadius: string;
  trackBorder: string;
}>;

export const core: SliderTheme = {
  color: 'red',
  handleSize: 25,
  handleBorderColor: 'blue',
  handleBorderWidth: '2px',
  handleMarginTop: '',
  handleRadius: '50%',
  handleBackground: 'green',
  trackWidth: '100%',
  trackHeight: '50%',
  trackBackground: '#282d32',
  trackOpacity: '0.3',
  trackRadius: '8px',
  trackBorder: '2px solid brown',
};
