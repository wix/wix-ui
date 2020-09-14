import * as React from 'react';

export interface PopoverContextValue {
  /*
   * A list of classes to be excluded from clicking outside a popover.
   * Clicking on an element containing an excluded class will be considered as a click inside the Popover.
   */
  excludeClickOutsideClasses: string[];
}

export const PopoverContext = React.createContext<PopoverContextValue>({
  excludeClickOutsideClasses: [],
});
