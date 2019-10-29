declare namespace __WSR {
  namespace BaseComponents {
    export interface WixComponentProps {
      dataHook?: string;
      styles?: string;
    }

    export class WixComponent<
      T extends WixComponentProps = {}
    > extends React.PureComponent<T> {}
  }
}
