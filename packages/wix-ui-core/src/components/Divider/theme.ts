import {palette} from '../../palette';

export interface DividerTheme {
    height?: string;
    backgroundColor?: string;
    opacity?: string;

    marginTop?: string;
    marginBottom?: string;
}

export const core: DividerTheme = {
    height: '1px',
    backgroundColor: palette.black,
    opacity: '0.12',

    marginTop: '0px',
    marginBottom: '0px'
};
