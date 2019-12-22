declare namespace __WSR {
  namespace Popover {
    export type PopoverProps = import("wix-ui-core/popover").PopoverProps & {
      dataHook?: string;
      animate?: boolean;
      theme?: PopoverTheme;
      disableClickOutsideWhenClosed?: boolean;
    };

    export class Popover extends React.Component<PopoverProps> {
      static Element: React.SFC<{ children: React.ReactNode }>;
      static Content: React.SFC<{ children: React.ReactNode }>;
    }

    export type PopoverTheme = "dark" | "light";
  }
}

declare module "wix-style-react" {
  export import Popover = __WSR.Popover.Popover;
  export import PopoverProps = __WSR.Popover.PopoverProps;
}

declare module "wix-style-react/Popover" {
  export interface PopoverProps extends __WSR.Popover.PopoverProps {}
  export default __WSR.Popover.Popover;
}
