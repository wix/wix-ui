import {core} from './theme';
import defaultsDeep from 'lodash/defaultsDeep';

export const styles = theme => {
  theme = defaultsDeep(theme, core);
  
  return {}
}