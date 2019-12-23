declare namespace __WSR {
  namespace FieldLabelAttributes {
    export interface FieldLabelAttributesProps
      extends BaseComponents.WixComponentProps {
      required?: boolean;
      info?: React.ReactNode;
      appendToParent?: boolean;
      tooltip?: React.ReactNode;
    }

    export class FieldLabelAttributes extends BaseComponents.WixComponent<
      FieldLabelAttributesProps
    > {}
  }
}

declare module "wix-style-react" {
  export import FieldLabelAttributes = __WSR.FieldLabelAttributes.FieldLabelAttributes;
  export import FieldLabelAttributesProps = __WSR.FieldLabelAttributes.FieldLabelAttributesProps;
}

declare module "wix-style-react/FieldLabelAttributes" {
  export interface FieldLabelAttributesProps
    extends __WSR.FieldLabelAttributes.FieldLabelAttributesProps {}
  export default __WSR.FieldLabelAttributes.FieldLabelAttributes;
}
