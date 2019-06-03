import * as React from 'react';
import { withFocusable } from '../FocusableHOC';
import { ButtonNext } from '../../../components/button-next/button-next';

export enum DataHook {
    FirstButton = 'first-button',
    SecondButton = 'second-button',
}

const ButtonElement = withFocusable(ButtonNext);

export class FocusableHOCTestFixture extends React.Component {
    private readonly firstButtonRef: React.RefObject<React.Component>;
    private readonly secondButtonRef: React.RefObject<React.Component>;

    constructor(props) {
        super(props);

        this.firstButtonRef = React.createRef();
        this.secondButtonRef = React.createRef();
    }

    private readonly _onFirstButtonClick = () => {
        (this.secondButtonRef.current as any).focus()
    };

    render() {
        return (
            <div>
                <ButtonElement data-hook={DataHook.FirstButton}
                               ref={this.firstButtonRef}
                               onClick={this._onFirstButtonClick}>First Button</ButtonElement>
                <ButtonElement data-hook={DataHook.SecondButton}
                               ref={this.secondButtonRef}>Second Button</ButtonElement>
            </div>
        );
    }
}
