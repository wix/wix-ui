declare namespace __WSR {
  namespace SortableList {
    export interface SortableListProps
      extends BaseComponents.WixComponentProps,
        Draggable.DraggableProps {
      insertPosition?: SortableListInsertPosition;
      usePortal?: boolean;
      dragPreview?: boolean;
      items?: object[];
      className?: string;
      contentClassName?: string;
    }

    export class SortableList extends BaseComponents.WixComponent<
      SortableListProps
    > {}

    export type SortableListInsertPosition = "start" | "end" | "any";
  }
}

declare module "wix-style-react" {
  export import SortableList = __WSR.SortableList.SortableList;
  export import SortableListProps = __WSR.SortableList.SortableListProps;
}

declare module "wix-style-react/SortableList" {
  export interface SortableListProps
    extends __WSR.SortableList.SortableListProps {}
  export default __WSR.SortableList.SortableList;
}
