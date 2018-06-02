import * as React from 'react';
import {renderToString} from 'react-dom/server';
import MetaDataTools from '../meta-data-tools';

export function autoSSR() {
    MetaDataTools.metaData.forEach((value, Key) => {
        try {
            renderToString(<Key />);
        } catch (e) {
            throw new Error(`Failed to render <${Key} /> component: ${e}`);
        }
    });
}
