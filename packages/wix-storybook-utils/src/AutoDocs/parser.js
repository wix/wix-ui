import {parse} from 'react-docgen';

import ComponentResolver from './component-resolver';

export default (source = '') =>
  parse(source, ComponentResolver);
