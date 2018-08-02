import {InputWithOptions} from './InputWithOptions';
import Registry from '@ui-autotools/registry';

const inputWithOptionsMetadata = Registry.getComponentMetadata(InputWithOptions);
inputWithOptionsMetadata.reactStrictModeCompliant = false;

inputWithOptionsMetadata
  .addSim({
    title: 'Simulation with default props',
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