declare namespace __WSR {
  namespace CalendarPanelFooter {
    export interface CalendarPanelFooterProps {
      dataHook?: string;
      primaryActionLabel: string,
      secondaryActionLabel: string,
      primaryActionDisabled: boolean,
      primaryActionOnClick: React.MouseEventHandler<HTMLButtonElement>,
      secondaryActionOnClick: React.MouseEventHandler<HTMLButtonElement>,
      // selectedDays: // todo: add once calendarPanel is merged
      /** Formats a Date into a string for displaying the current selected days. Receives a Date instance (not undefined). */
      // dateToString: (selectedDays: selectedDays) // todo: add once calendarPanel is merged
    }

    export class CalendarPanelFooter extends React.Component<CalendarPanelFooterProps> {}

    export interface CalendarPanelFooterItem {
      title?: React.ReactNode;
      icon?: React.ReactNode;
      content?: React.ReactNode;
      expandLabel?: React.ReactNode;
      collapseLabel?: React.ReactNode;
      buttonType?: CalendarPanelFooterItemButtonType;
    }

    export type CalendarPanelFooterItemButtonType = "textButton" | "button";
  }
}

declare module "wix-style-react" {
  export import CalendarPanelFooter = __WSR.CalendarPanelFooter.CalendarPanelFooter;
  export import CalendarPanelFooterProps = __WSR.CalendarPanelFooter.CalendarPanelFooterProps;
}

declare module "wix-style-react/CalendarPanelFooter" {
  export interface CalendarPanelFooterProps extends __WSR.CalendarPanelFooter.CalendarPanelFooterProps {}
  export default __WSR.CalendarPanelFooter.CalendarPanelFooter;
}
