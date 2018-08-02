import {InputWithOptions} from './InputWithOptions';
import Registry from '@ui-autotools/registry';

const inputWithOptionsMetadata = Registry.getComponentMetadata(InputWithOptions);
inputWithOptionsMetadata
  .addSim({
    title: 'inputWithOptionsSim',
    props: {
      options: [
        {
          id: '',
          isDisabled: false,
          isSelectable: false,
          value: '',
          render: value => {return value;}
        }
      ], 
      inputProps: {}
    }
  });