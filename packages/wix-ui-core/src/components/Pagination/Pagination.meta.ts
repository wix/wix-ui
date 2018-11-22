import {Pagination} from './Pagination';
import Registry from '@ui-autotools/registry';
import style from './PaginationTest.st.css';


const paginationMetadata = Registry.getComponentMetadata(Pagination);
paginationMetadata.nonReactStrictModeCompliant = true;

paginationMetadata.exportedFrom({
  path: 'src/components/Pagination/Pagination',
  exportName: 'Pagination',
  baseStylePath: 'src/components/Pagination/Pagination.st.css'
});

paginationMetadata.addStyle(style, {name: 'style', path: 'src/components/Pagination/PaginationTest.st.css'});

paginationMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      totalPages: 4
    }
  });