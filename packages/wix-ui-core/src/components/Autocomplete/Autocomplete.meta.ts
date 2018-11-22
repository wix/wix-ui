import {Autocomplete} from './Autocomplete';
import Registry from '@ui-autotools/registry';

const autocompleteMetadata = Registry.getComponentMetadata(Autocomplete);
autocompleteMetadata.nonReactStrictModeCompliant = true;

autocompleteMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      options: [],
      inputProps: {'aria-label': 'Start typing to see options'}
    }
  });