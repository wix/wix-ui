declare namespace __WSR {
  namespace Label {
    export type LabelProps = import('wix-ui-core/label').LabelProps &
      import('wix-ui-core/dist/src/createHOC').WixComponentProps &
      import('wix-ui-backoffice/dist/src/components/Label/Label').LabelProps;

    export class Label extends React.PureComponent<LabelProps> {}
  }
}

declare module 'wix-style-react' {
  export import Label = __WSR.Label.Label;
  export import LabelProps = __WSR.Label.LabelProps;
}

declare module 'wix-style-react/Label' {
  export interface LabelProps extends __WSR.Label.LabelProps {}
  export default __WSR.Label.Label;
}
