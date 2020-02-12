import * as React from 'react';
import { badgeSelectItemBuilder } from 'wix-style-react/BadgeSelectItemBuilder';

function badgeSelectItemBuilderWithAllProps() {
  const {id, value} = badgeSelectItemBuilder({ id: '1', skin: 'danger', text: 'text' });
}
