import * as React from 'react';

interface PopoverContentProps {
  children: any;
}

const PopoverContent: React.SFC<PopoverContentProps> = ({children}) => children;
PopoverContent.displayName = 'Popover.Content';

export default PopoverContent;