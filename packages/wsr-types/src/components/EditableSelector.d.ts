declare namespace __WSR {
  namespace EditableSelector {
    export interface EditableSelectorProps {
      dataHook?: string;
      styles?: string;
      title?: string;
      toggleType?: 'checkbox' | 'radio';
      newRowLabel?: string;
      editButtonText?: string;
      onOptionAdded?: (title: string) => void;
      onOptionEdit?: (title: string, id: number) => void;
      onOptionDelete?: (id: number) => void
      onOptionToggle?: (id: number) => void;
      options?: Array<EditableSelectorOption>;
    }

    export type EditableSelectorOption = {
      title: string;
      isSelected?: boolean;
    };

    export class EditableSelector extends React.Component<
      EditableSelectorProps
    > {}
  }
}

declare module "wix-style-react" {
  export import EditableSelector = __WSR.EditableSelector.EditableSelector;
  export import EditableSelectorProps = __WSR.EditableSelector.EditableSelectorProps;
}

declare module "wix-style-react/EditableSelector" {
  export interface EditableSelectorProps
    extends __WSR.EditableSelector.EditableSelectorProps {}
  export default __WSR.EditableSelector.EditableSelector;
}
