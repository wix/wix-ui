import * as React from 'react';

interface PopoverElementProps {
  children: any;
}

const PopoverElement: React.SFC<PopoverElementProps> = ({children}) => children;
PopoverElement.displayName = 'Popover.Element';

export default PopoverElement;
