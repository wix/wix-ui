declare namespace __WSR {
  namespace CardGalleryItem {
    export interface CardGalleryItemProps {
      badge?: React.ReactNode;
      title?: React.ReactNode;
      subtitle?: React.ReactNode;
      backgroundImageUrl?: string;
      backgroundImageNode?: React.ReactNode;
      primaryActionProps?: {
        label?: React.ReactNode;
        onClick?: React.MouseEventHandler<HTMLElement>;
        disabled?: boolean;
        disabledMessage?: string;
      };
      secondaryActionProps?: {
        label?: React.ReactNode;
        onClick?: React.MouseEventHandler<HTMLElement>;
      };
      settingsMenu?: React.ReactNode;
      dataHook?: string;
    }

    export class CardGalleryItem extends React.PureComponent<CardGalleryItemProps> {}
  }
}

declare module 'wix-style-react' {
  export import CardGalleryItem = __WSR.CardGalleryItem.CardGalleryItem;
  export import CardGalleryItemProps = __WSR.CardGalleryItem.CardGalleryItemProps;
}

declare module 'wix-style-react/CardGalleryItem' {
  export interface CardGalleryItemProps extends __WSR.CardGalleryItem.CardGalleryItemProps {}
  export default __WSR.CardGalleryItem.CardGalleryItem;
}
