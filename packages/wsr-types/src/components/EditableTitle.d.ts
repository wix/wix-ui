declare namespace __WSR {
  namespace EditableTitle {
    export interface EditableTitleProps {
      dataHook?: string;
      initialValue?: string;
      defaultValue?: string;
      onSubmit?: (value: string) => void;
      maxLength?: number;
      autoFocus?: boolean;
    }

    export class EditableTitle extends React.Component<EditableTitleProps> {}
  }
}

declare module "wix-style-react" {
  export import EditableTitle = __WSR.EditableTitle.EditableTitle;
  export import EditableTitleProps = __WSR.EditableTitle.EditableTitleProps;
}

declare module "wix-style-react/EditableTitle" {
  export interface EditableTitleProps extends __WSR.EditableTitle.EditableTitleProps {}
  export default __WSR.EditableTitle.EditableTitle;
}
