
import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import {NumberInput} from '../../src/components/number-input';
import {numberInput, backofficeTheme} from '../../src/themes/backoffice';
export default () => (
    <div>
        <CodeShowcase
            title="Default"
            theme={backofficeTheme}
        >
            <NumberInput className={numberInput()}/>
            <NumberInput className={numberInput('flat')}/>
            <NumberInput className={numberInput('right')}/>
            <NumberInput className={numberInput('flat', 'small')}/>
        </CodeShowcase>
    </div>
);