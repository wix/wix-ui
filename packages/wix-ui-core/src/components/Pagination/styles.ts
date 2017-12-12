import {core} from './theme';
import {defaultsDeep} from 'lodash';

export const styles = theme => {
  theme = defaultsDeep(theme, core);
  
  return {}
}