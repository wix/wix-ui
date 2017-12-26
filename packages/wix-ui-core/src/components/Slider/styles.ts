import {core, SliderTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: SliderTheme) => {
    theme = (defaultsDeep(theme, core) as SliderTheme);

    return {
        root: {
            color: '#fff'
        }
    };
};
