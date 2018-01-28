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
  trackBorderColor: string;
  trackBorderWidth: string;
}>;

export const core: SliderTheme = {
  color: 'red',
  handleSize: 25,
  handleBorderColor: 'blue',
  handleBorderWidth: '2px',
  handleRadius: '50%',
  handleBackground: 'green',
  trackWidth: '100%',
  trackHeight: '100%',
  trackBackground: '#282d32',
  trackOpacity: '1',
  trackRadius: '8px',
  trackBorderColor: '#ffbaea',
  trackBorderWidth: '2px',
};
