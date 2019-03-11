import * as React from 'react';
import cx from 'classnames';
import {GlobalEvent} from '../global-event';

import styles from './stepper.st.css';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    disableUp?: boolean;
    disableDown?: boolean;
    dragStep?: number;
    onUp(modifiers: Modifiers): void;
    onDown(modifiers: Modifiers): void;
}

export interface StepperState {
    dragged: boolean;
}

export interface Modifiers {
    altKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
}

interface DragPoint {
    clientX: number;
    clientY: number;
}

const DEFAULTS = {
    dragStep: 10,
    disableUp: false,
    disableDown: false
};

export class Stepper extends React.Component<StepperProps, StepperState> {
    public static defaultProps: Partial<StepperProps> = {
        disableUp: DEFAULTS.disableUp,
        disableDown: DEFAULTS.disableDown
    };

    public state: StepperState = {dragged: false};

    private dragRefPoint: DragPoint = {
        clientX: 0,
        clientY: 0
    };

    public render() {
        const {dragged} = this.state;
        const {
            disableUp,
            disableDown,
            dragStep,
            className,
            onUp,
            onDown,
            ...props
        } = this.props;

        return (
            <div
                {...props}
                className={cx(styles.root, className)}
                onMouseDown={this.handleMouseDown}
            >
                <button
                    type="button"
                    tabIndex={-1}
                    data-automation-id="STEPPER_INCREMENT"
                    className={styles.up}
                    onClick={this.handlerClickUp}
                    disabled={disableUp}
                />
                <button
                    type="button"
                    tabIndex={-1}
                    data-automation-id="STEPPER_DECREMENT"
                    className={styles.down}
                    onClick={this.handlerClickDown}
                    disabled={disableDown}
                />
                <GlobalEvent
                    mousemove={dragged ? this.handleDrag : undefined}
                    mouseup={this.handleDragStop}
                />
            </div>
        );
    }

    private handlerClickUp: React.MouseEventHandler<HTMLButtonElement> = ({
        altKey,
        ctrlKey,
        shiftKey
    }) => this.props.onUp({altKey, ctrlKey, shiftKey});

    private handlerClickDown: React.MouseEventHandler<HTMLButtonElement> = ({
        altKey,
        ctrlKey,
        shiftKey
    }) => this.props.onDown({altKey, ctrlKey, shiftKey});

    private handleMouseDown: React.MouseEventHandler<HTMLDivElement> = e => {
        const {clientX, clientY} = e;

        this.setState({dragged: true});
        this.updateDragRefPoint({clientX, clientY});

        if (typeof this.props.onMouseDown === 'function') {
            this.props.onMouseDown(e);
        }
    };

    private handleDragStop = () => {
        this.setState({dragged: false});
        this.resetDragRefPoint();
    };

    private updateDragRefPoint({clientX, clientY}: DragPoint) {
        this.dragRefPoint.clientX = clientX;
        this.dragRefPoint.clientY = clientY;
    }

    private resetDragRefPoint() {
        this.dragRefPoint.clientX = 0;
        this.dragRefPoint.clientY = 0;
    }

    private handleDrag = ({
        clientX,
        clientY,
        shiftKey,
        altKey,
        ctrlKey
    }: MouseEvent) => {
        const {dragged} = this.state;
        const {
            onUp,
            onDown,
            disableUp,
            disableDown,
            dragStep = DEFAULTS.dragStep
        } = this.props;
        const refPoint = this.dragRefPoint;

        if (dragged) {
            if (!disableUp && clientY <= refPoint.clientY - dragStep) {
                this.updateDragRefPoint({clientX, clientY});
                onUp({altKey, ctrlKey, shiftKey});
            }

            if (!disableDown && clientY >= refPoint.clientY + dragStep) {
                this.updateDragRefPoint({clientX, clientY});
                onDown({altKey, ctrlKey, shiftKey});
            }
        }
    };
}
