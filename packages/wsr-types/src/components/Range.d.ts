declare namespace __WSR {
  namespace Range {
    export interface RangeProps {
      required?: boolean,
      info?: string,
      dataHook?: string,
      style?: string,
      appendToParent?: boolean,
    }

    export class Range extends React.Component<RangeProps> {}
  }
}

declare module 'wix-style-react' {
  export import Range = __WSR.Range.Range;
  export import RangeProps = __WSR.Range.RangeProps;
}

declare module 'wix-style-react/Range' {
  export interface RangeProps extends __WSR.Range.RangeProps {}
  export default __WSR.Range.Range;
}
