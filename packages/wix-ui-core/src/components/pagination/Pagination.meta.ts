import {Pagination} from './Pagination';
import Registry from '@ui-autotools/registry';

const paginationMetadata = Registry.getComponentMetadata(Pagination);
paginationMetadata.nonReactStrictModeCompliant = true;

paginationMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      totalPages: 4
    }
  });