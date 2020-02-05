declare namespace __WSR {
  namespace CalendarPanel {
    export interface CalendarPanelProps {
      dataHook?: string;
      className?: string;
      onChange: (selectedDays: SelectedDaysType) => void;
      onClose?: (e: React.SyntheticEvent) => void;
      excludePastDates?: boolean;
      filterDate?: (date: Date) => boolean;
      value?: SelectedDaysType;
      numOfMonths?: number;
      selectionMode?: SelectionModeType;
      showYearDropdown?: boolean;
      showMonthDropdown?: boolean;
      shouldCloseOnSelect?: boolean;
      locale?: LanguageType | { distanceInWords?: object; format?: object };
      presets?: PresetType[] | {selectedDays?: SelectedDaysType, id?: string | number};
      footer?: (selectedDays: SelectedDaysType, submitDisabled: boolean) => void;
    }

    type PresetType = OptionType | { value: "-" };

    type OptionType = {
      id: string | number;
      value: React.ReactNode | string | Function;
      disabled?: boolean;
      overrideStyle?: boolean;
      selectedDays: SelectedDaysType;
    };

    export type LanguageType =
      | "en"
      | "es"
      | "pt"
      | "fr"
      | "de"
      | "pl"
      | "it"
      | "ru"
      | "ja"
      | "ko"
      | "tr"
      | "sv"
      | "no"
      | "nl"
      | "da"
      | "zh"
      | "th"
      | "cs";

    export type SelectedDaysType = string | Date | DateRangeType;

    export type DateRangeType = { from?: string | Date; to?: string | Date };

    type SelectionModeType = "day" | "range";

    export class CalendarPanel extends React.Component<CalendarPanelProps> {}
  }
}

declare module "wix-style-react" {
  export import CalendarPanel = __WSR.CalendarPanel.CalendarPanel;
  export import CalendarPanelProps = __WSR.CalendarPanel.CalendarPanelProps;
}

declare module "wix-style-react/CalendarPanel" {
  export interface CalendarPanelProps
    extends __WSR.CalendarPanel.CalendarPanelProps {}
  export default __WSR.CalendarPanel.CalendarPanel;
}
