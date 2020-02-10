import * as React from 'react';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';

function PopoverMenuItemWithMandatoryProps() {
  return <PopoverMenuItem />;
}

function PopoverMenuItemWithAllProps() {
  return (
    <PopoverMenuItem
      dataHook="hook"
      disabled
      divider
      icon={<div />}
      onClick={_ev => {}}
      size="large"
      styles="font: 14px"
      text="text"
    ></PopoverMenuItem>
  );
}
