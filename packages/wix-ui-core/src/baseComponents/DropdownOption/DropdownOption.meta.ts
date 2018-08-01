import {DropdownOption} from './DropdownOption';
import Registry from '@ui-autotools/registry';

const dropdownOptionMetadata = Registry.getComponentMetadata(DropdownOption);
dropdownOptionMetadata
  .addSim({
    title: 'dropdownOptionSim',
    props: {
      className: '',
      option: {
        id: 1,
        isDisabled: false,
        isSelectable: false,
        value: '',
        render: value => {return value;}
      },
      isSelected: false,
      isHovered: false,
      // tslint:disable-next-line:no-empty
      onClickHandler: () => {},
      // tslint:disable-next-line:no-empty
      onMouseEnterHandler: () => {},
    }
  });