declare namespace __WSR {
  namespace FilePicker {
    export interface FilePickerProps extends BaseComponents.WixComponentProps {
      header?: string;
      onChange?: (file: File) => void;
      mainLabel?: string;
      subLabel?: string;
      supportedFormats?: string;
      maxSize?: number;
      error?: boolean;
      errorMessage?: string;
      id?: string | number;
      name?: string;
    }

    export class FilePicker extends BaseComponents.WixComponent<
      FilePickerProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import FilePicker = __WSR.FilePicker.FilePicker;
  export import FilePickerProps = __WSR.FilePicker.FilePickerProps;
}

declare module 'wix-style-react/FilePicker' {
  export interface FilePickerProps extends __WSR.FilePicker.FilePickerProps {}
  export default __WSR.FilePicker.FilePicker;
}
