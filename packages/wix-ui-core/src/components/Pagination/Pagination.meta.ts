import {Pagination} from './Pagination';
import Registry from '@ui-autotools/registry';

const paginationMetadata = Registry.getComponentMetadata(Pagination);
paginationMetadata.nonReactStrictModeCompliant = false;

paginationMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      totalPages: 4
    }
  });