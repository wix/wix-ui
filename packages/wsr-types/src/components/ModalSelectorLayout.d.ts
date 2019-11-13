declare namespace __WSR {
  namespace ModalSelectorLayout {
    export type ModalSelectorLayoutSingleProps = {
      onOk?: (selectedItem: ModalSelectorLayoutItem) => void;
      multiple?: false;
    };

    export type ModalSelectorLayoutMultipleProps = {
      onOk?: (selectedItems: ModalSelectorLayoutItem[]) => void;
      multiple: true;
    };

    export type ModalSelectorLayoutProps = BaseComponents.WixComponentProps &
      ModalSelectorLayoutCommonProps &
      (ModalSelectorLayoutSingleProps | ModalSelectorLayoutMultipleProps);

    export type ModalSelectorLayoutCommonProps = {
      title?: React.ReactNode;
      subtitle?: React.ReactNode;
      onClose?: React.MouseEventHandler<HTMLButtonElement>;
      onCancel?: React.MouseEventHandler<HTMLButtonElement>;
      dataSource: ModalSelectorLayoutDatasourceFn;
      cancelButtonText?: string;
      okButtonText?: string;
      imageSize?: ModalSelectorLayoutImageSize;
      imageShape?: ModalSelectorLayoutImageShape;
      searchPlaceholder?: string;
      emptyState: React.ReactNode;
      noResultsFoundStateFactory?: (searchValue: string) => React.ReactNode;
      itemsPerPage?: number;
      withSearch?: boolean;
      searchDebounceMs?: number;
      height?: string;
      maxHeight?: string;
      selectAllText?: string;
      deselectAllText?: string;
    };

    export class ModalSelectorLayout extends BaseComponents.WixComponent<
      ModalSelectorLayoutProps
    > {}

    export type ModalSelectorLayoutDatasourceFn = (
      searchQuery: string,
      offset: number,
      limit: number
    ) => Promise<{ items: ModalSelectorLayoutItem[]; totalCount: number }>;

    export interface ModalSelectorLayoutItem {
      id: number | string;
      title: string;
      subtitle?: string;
      extraText?: string;
      extraNode?: string;
      disabled?: boolean;
      selected?: boolean;
      image?: React.ReactNode;
    }

    export type ModalSelectorLayoutImageSize =
      | 'tiny'
      | 'small'
      | 'portrait'
      | 'large'
      | 'cinema';

    export type ModalSelectorLayoutImageShape = 'rectangular' | 'circle';
  }
}

declare module 'wix-style-react' {
  export import ModalSelectorLayout = __WSR.ModalSelectorLayout.ModalSelectorLayout;
  export import ModalSelectorLayoutProps = __WSR.ModalSelectorLayout.ModalSelectorLayoutProps;
}

declare module 'wix-style-react/ModalSelectorLayout' {
  export type ModalSelectorLayoutProps = __WSR.ModalSelectorLayout.ModalSelectorLayoutProps;
  export type ModalSelectorLayoutItem = __WSR.ModalSelectorLayout.ModalSelectorLayoutItem;
  export default __WSR.ModalSelectorLayout.ModalSelectorLayout;
}
