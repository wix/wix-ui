import * as React from 'react';
import Registry from '@ui-autotools/registry';
import { FilePickerButton } from '../FilePickerButton';

const filePickerButtonMetadata =
  Registry.getComponentMetadata(FilePickerButton);
filePickerButtonMetadata.addSim({
  title: 'FilePickerButton simulation',
  props: {
    id: 'winter-is-coming',
    children: (
      <div>
        <i>+</i>Choose a File
      </div>
    ),
    accept: '.jpg,.png',
  },
});
