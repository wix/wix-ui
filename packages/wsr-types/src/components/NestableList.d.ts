declare namespace __WSR {
  namespace NestableList {
    export interface NestableListProps
      extends BaseComponents.WixComponentProps {
      items?: object[];
      isRenderDraggingChildren?: boolean;
      childrenProperty?: string;
      childrenStyle?: React.CSSProperties;
      onUpdate?: (data: { items: object[]; item: object }) => void;
      useDragHandle?: boolean;
      maxDepth?: number;
      threshold?: number;
      onDragStart?: (itemProps: any) => void;
      onDragEnd?: (itemProps: any) => void;
      renderItem?: (data: {
        isPlaceholder: boolean;
        depth: number;
        isPreview: boolean;
        connectDragSource: any;
        item: object;
      }) => React.ReactNode;
    }

    export class NestableList extends BaseComponents.WixComponent<
      NestableListProps
    > {}
  }
}

declare module "wix-style-react" {
  export import NestableList = __WSR.NestableList.NestableList;
  export import NestableListProps = __WSR.NestableList.NestableListProps;
}

declare module "wix-style-react/NestableList" {
  export interface NestableListProps
    extends __WSR.NestableList.NestableListProps {}
  export default __WSR.NestableList.NestableList;
}
