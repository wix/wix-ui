export type SliderTheme = Partial<{
  color: string;
  handleSize: number;
  handleBorderColor: string;
  handleBorderWidth: string;
  handleMarginTop: string;
  handleRadius: string;
  handleBackground: string;
  trackSize: string;
  trackBackground: string;
  trackOpacity: string;
  trackRadius: string;
  trackBorderColor: string;
  trackBorderWidth: string;
  tooltipBackground: string;
}>;

export const core: SliderTheme = {
  handleSize: 25,
  handleBorderColor: 'blue',
  handleBorderWidth: '2px',
  handleRadius: '50%',
  handleBackground: 'green',
  trackSize: '25%',
  trackBackground: '#dadada',
  trackOpacity: '1',
  trackRadius: '8px',
  trackBorderColor: 'transparent',
  trackBorderWidth: '2px',
  tooltipBackground: '#363636'
};
