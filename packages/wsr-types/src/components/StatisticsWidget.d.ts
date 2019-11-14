declare namespace __WSR {
  namespace StatisticsWidget {
    export interface StatisticsWidgetProps {
      dataHook?: string;
      /** The old name of the items props. Will be removed in future.
       * @deprecated
       * */
      statistics?: StatisticsWidgetItem[];
      items?: StatisticsWidgetItem[];
    }

    export class StatisticsWidget extends React.PureComponent<
      StatisticsWidgetProps
    > {}

    export type StatisticsWidgetItem = {
      value: string;
      valueInShort?: string;
      description?: string;
      descriptionInfo?: string;
      percentage?: number;
      invertedPercentage?: boolean;
      onClick?: (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
      ) => void;
    };
  }
}

declare module "wix-style-react" {
  export import StatisticsWidget = __WSR.StatisticsWidget.StatisticsWidget;
  export import StatisticsWidgetProps = __WSR.StatisticsWidget.StatisticsWidgetProps;
}

declare module "wix-style-react/StatisticsWidget" {
  export interface StatisticsWidgetProps
    extends __WSR.StatisticsWidget.StatisticsWidgetProps {}
  export default __WSR.StatisticsWidget.StatisticsWidget;
}
