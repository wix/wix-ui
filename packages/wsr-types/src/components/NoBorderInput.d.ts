declare namespace __WSR {
  namespace NoBorderInput {
    export interface NoBorderInputProps extends Input.InputProps {
      label?: string;
      status?: NoBorderInputStatus;
    }

    export class NoBorderInput extends React.Component<NoBorderInputProps> {
      static StatusError: typeof Input.Input.StatusError;
    }

    export type NoBorderInputStatus = NoBorderInputStatusError;
    export type NoBorderInputStatusError = Input.InputStatusError;
  }
}

declare module "wix-style-react" {
  export import NoBorderInput = __WSR.NoBorderInput.NoBorderInput;
  export import NoBorderInputProps = __WSR.NoBorderInput.NoBorderInputProps;
}

declare module "wix-style-react/NoBorderInput" {
  export interface NoBorderInputProps
    extends __WSR.NoBorderInput.NoBorderInputProps {}
  export default __WSR.NoBorderInput.NoBorderInput;
}
