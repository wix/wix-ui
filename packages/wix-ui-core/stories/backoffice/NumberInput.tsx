
import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import {NumberInput} from '../../src/components/number-input';
import {numberInput, backofficeTheme} from '../../src/themes/backoffice';
export default () => (
    <div>
        <CodeShowcase
            title="Default"
            code="<NumberInput className={numberInput()}/>"
            theme={backofficeTheme}
        >
            <NumberInput className={numberInput()}/>
        </CodeShowcase>
        <CodeShowcase
            title="Flat (no borders, paddings, shadows)"
            code="<NumberInput className={numberInput('flat')}/>"
            theme={backofficeTheme}
        >
            <NumberInput className={numberInput('flat')}/>
        </CodeShowcase>
        <CodeShowcase
            title="Right alligment"
            code="<NumberInput className={numberInput('right')}/>"
            theme={backofficeTheme}
        >
            <NumberInput className={numberInput('right')}/>
        </CodeShowcase>
        <CodeShowcase
            title="Small text"
            code="<NumberInput className={numberInput('small')}/>"
            theme={backofficeTheme}
        >
            <NumberInput className={numberInput('small')}/>
        </CodeShowcase>
    </div>
);