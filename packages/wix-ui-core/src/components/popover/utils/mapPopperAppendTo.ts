import { PopoverProps } from '../Popover';

export const mapPopperAppendTo = (appendTo: PopoverProps['appendTo']) => {
  if (typeof appendTo === 'function' || appendTo === 'parent') {
    return;
  }
  return appendTo;
};
