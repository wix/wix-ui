declare namespace __WSRTests {
  interface CalendarPanelDriver extends BaseDriver {
    exists: () => boolean;
    calendarDriver: () => any; // todo: change to calendar driver when type is added
    presetsDropdownLayoutDriver: () => DropdownLayoutDriver;
    isDropdownExists: () => boolean;
    findByDataHook: (dataHook: string) => boolean;
  }
}
