declare namespace __WSR {
  namespace CounterBadge {
    export interface CounterBadgeProps
      extends React.HTMLAttributes<HTMLElement> {
      dataHook?: string;
      skin?: CounterBadgeSkin;
      children?: CounterBadgeContent;
    }

    export class CounterBadge extends React.PureComponent<CounterBadgeProps> {}

    export type CounterBadgeContent = string | number | React.ReactElement<any>;
    export type CounterBadgeSkin =
      | "general"
      | "standard"
      | "danger"
      | "warning"
      | "urgent"
      | "success";
  }
}

declare module "wix-style-react" {
  export import CounterBadge = __WSR.CounterBadge.CounterBadge;
  export import CounterBadgeProps = __WSR.CounterBadge.CounterBadgeProps;
}

declare module "wix-style-react/CounterBadge" {
  export interface CounterBadgeProps
    extends __WSR.CounterBadge.CounterBadgeProps {}
  export default __WSR.CounterBadge.CounterBadge;
}
