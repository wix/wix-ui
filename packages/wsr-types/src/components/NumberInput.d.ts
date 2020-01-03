declare namespace __WSR {
  namespace NumberInput {
    export interface NumberInputProps extends Input.InputProps {
      strict?: boolean;
    }

    export class NumberInput extends React.PureComponent<NumberInputProps> {}
  }
}

declare module "wix-style-react" {
  export import NumberInput = __WSR.NumberInput.NumberInput;
  export import NumberInputProps = __WSR.NumberInput.NumberInputProps;
}

declare module "wix-style-react/NumberInput" {
  export interface NumberInputProps
    extends __WSR.NumberInput.NumberInputProps {}
  export default __WSR.NumberInput.NumberInput;
}
