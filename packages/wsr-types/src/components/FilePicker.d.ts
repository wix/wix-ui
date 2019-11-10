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

    export class FilePciker extends BaseComponents.WixComponent<
      FilePickerProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import FilePciker = __WSR.FilePicker.FilePciker;
  export import FilePcikerProps = __WSR.FilePicker.FilePickerProps;
}

declare module 'wix-style-react/FilePicker' {
  export interface FilePcikerProps extends __WSR.FilePicker.FilePickerProps {}
  export default __WSR.FilePicker.FilePciker;
}
