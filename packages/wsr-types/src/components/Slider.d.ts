declare namespace __WSR {
  namespace Slider {
    export interface SliderProps {
      allowCross?: boolean;
      dataHook?: string;
      displayMarks?: boolean;
      displayTooltip?: boolean;
      id?: string;
      max?: number;
      min?: number;
      onAfterChange?: (value: number[] | number) => void;
      onChange: (value: number[] | number) => void;
      rtl?: boolean;
      step?: number;
      pushable?: boolean | number;
      value?: number[] | number;
      disabled?: boolean;
      marks?: {[key:number]: number} | {[key:number]: string};
    }

    export class Slider extends React.PureComponent<SliderProps> {}
  }
}

declare module 'wix-style-react' {
  export import Slider = __WSR.Slider.Slider;
  export import SliderProps = __WSR.Slider.SliderProps;
}

declare module 'wix-style-react/Slider' {
  export interface SliderProps extends __WSR.Slider.SliderProps {}
  export default __WSR.Slider.Slider;
}
