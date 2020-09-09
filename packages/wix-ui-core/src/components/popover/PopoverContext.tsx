import * as React from 'react';

export interface PopoverContextValue {
  excludeClass: string;
}

export const PopoverContext = React.createContext<PopoverContextValue>({
  excludeClass: undefined,
});
