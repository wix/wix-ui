import {DropdownContent} from './DropdownContent';
import Registry from '@ui-autotools/registry';

const dropdownContentMetadata = Registry.getComponentMetadata(DropdownContent);
dropdownContentMetadata
  .addSim({
    title: 'dropdownContentSim',
    props: {
      options: [],
      // tslint:disable-next-line:no-empty
      onOptionClick: () => {},
      selectedIds: []
    }
  });