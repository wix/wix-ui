declare namespace __WSR {
  namespace ColorPicker {
    export interface ColorPickerProps {
      dataHook?: string
      value: string | object;
      showHistory?: boolean;
      showConverter?: boolean;
      showInput?: boolean;
      onChange: (color: string | object) => void;
      onCancel: (color: string | object) => void;
      onConfirm: (color: string | object) => void;
      onAdd?: (color: string | object) => void;
      addTooltipContent?: React.ReactNode;
      allowEmpty?: boolean;
      emptyPlaceholder?: string;
    }

    export class ColorPicker extends React.Component<ColorPickerProps> {}
  }
}

declare module "wix-style-react" {
  export import ColorPicker = __WSR.ColorPicker.ColorPicker;
  export import ColorPickerProps = __WSR.ColorPicker.ColorPickerProps;
}

declare module "wix-style-react/ColorPicker" {
  export interface ColorPickerProps extends __WSR.ColorPicker.ColorPickerProps {}
  export default __WSR.ColorPicker.ColorPicker;
}
