import {core, DividerTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: DividerTheme) => {
    theme = (defaultsDeep(theme, core) as DividerTheme);

    return {
        divider: {
            height: theme.height,
            backgroundColor: theme.backgroundColor,
            opacity: theme.opacity,

            marginTop: theme.marginTop,
            marginBottom: theme.marginBottom
        },
        vertical: {
            height: 'auto',
            width: theme.height
        }
    };
};
