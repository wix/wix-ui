declare namespace __WSR {
  namespace Text {
    export interface TextProps extends __WSR.BaseComponents.EllipsisHOCProps {
      dataHook?: string;
      tagName?: string;
      className?: string;
      size?: TextSize;
      secondary?: boolean;
      skin?: TextSkin;
      light?: boolean;
      weight?: TextWeight;
    }

    export const Text: React.SFC<TextProps>;

    export type TextSize = 'tiny' | 'small' | 'medium';

    export type TextSkin =
      | 'standard'
      | 'error'
      | 'success'
      | 'premium'
      | 'disabled';

    export type TextWeight = 'thin' | 'normal' | 'bold';
  }
}

declare module 'wix-style-react' {
  export import Text = __WSR.Text.Text;
  export import TextProps = __WSR.Text.TextProps;
}

declare module 'wix-style-react/Text' {
  export interface TextProps extends __WSR.Text.TextProps {}
  export default __WSR.Text.Text;
}
