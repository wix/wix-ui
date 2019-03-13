import * as React from 'react';
import cx from 'classnames';
import {codes as KeyCodes} from 'keycode';

import {Stepper, Modifiers} from './Stepper'
import {noop} from '../../utils';
import styles from './NumberInput.st.css';

const isNumber = (value: any): value is number => {
    return typeof value === 'number';
}

export interface NumberInputProps {
    value?: number;
    'data-automation-id'?: string;
    autoFocus?: boolean;
    className?: string;
    defaultValue?: number;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    error?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    isActive?: boolean;
    useKeyboard?: boolean;
    onChange?: (e: {value: number}) => void;
    onInput?: (e: {value: string}) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

interface DefaultProps {
    step: number;
    min: number;
    max: number;
}

export interface NumberInputState {
    value?: number;
    prevValue?: number;
    focus: boolean;
    error: boolean;
    committed: boolean;
}

enum Direction {
    Increase = 'increase',
    Decrease = 'decrease'
}

const DEFAULTS: DefaultProps = {
    step: 1,
    min: -Infinity,
    max: Infinity
};

function getPropWithDefault<
    Prop extends keyof NumberInputProps & keyof DefaultProps
>(
    props: NumberInputProps,
    name: Prop
): (DefaultProps & NumberInputProps)[Prop] {
    return props[name] === undefined ? (DEFAULTS[name] as any) : props[name];
}

export class NumberInput extends React.Component<
    NumberInputProps,
    NumberInputState
> {
    public static defaultProps: Partial<NumberInputProps> = {
        onChange: noop,
        onInput: noop
    };

    public static getDerivedStateFromProps(
        {value, defaultValue}: NumberInputProps,
        state: NumberInputState
    ) {
        if (defaultValue === undefined && value !== state.prevValue) {
            return {
                value,
                prevValue: value,
                committed: true
            };
        }

        return null;
    }

    private node: HTMLElement | null = null;
    private input: HTMLInputElement | null = null;

    private get isUncontrolled(): boolean {
        return this.props.defaultValue !== undefined;
    }

    private get currentValue(): number | undefined {
        return this.isUncontrolled
            ? this.input
                ? this.input.value !== ''
                    ? Number(this.input.value)
                    : undefined
                : this.props.defaultValue
            : this.state.value;
    }

    constructor(props: NumberInputProps) {
        super(props);

        this.state = {
            value: isNumber(props.value) ? props.value : props.defaultValue,
            focus: false,
            error: Boolean(props.error),
            committed: true,
            prevValue: props.value
        };
    }

    public componentDidMount() {
        if (this.props.isActive) {
            this.setActive();
        } else if (this.props.autoFocus) {
            this.focus();
        }
    }

    public componentDidUpdate(props: NumberInputProps) {
        if (this.props.isActive && !props.isActive) {
            this.setActive();
        }
    }

    public render() {
        const {value, focus} = this.state;
        const {
            step,
            min,
            max,
            placeholder,
            name,
            className,
            disabled,
            required,
            error,
            prefix,
            suffix,
            useKeyboard,
            onFocus
        } = this.props;
        const disableIncrement = disabled || (isNumber(value) && value >= max!);
        const disableDecrement = disabled || (isNumber(value) && value <= min!);

        return (
            <div
                {...styles(cx('root', className), {
                    disabled: Boolean(disabled),
                    error: Boolean(error),
                    focus
                })}
                data-automation-id={cx(
                    'NUMBER_INPUT',
                    this.props['data-automation-id']
                )}
                ref={node => (this.node = node)}
                tabIndex={useKeyboard ? 0 : -1}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleInputKeyDown}
            >
                {prefix ? <div className={styles.prefix}>{prefix}</div> : null}
                <input
                    ref={input => (this.input = input)}
                    className={styles.nativeInput}
                    data-automation-id="NATIVE_INPUT_NUMBER"
                    type="number"
                    name={name}
                    value={isNumber(value) ? value : ''}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    onChange={this.handleInputChange}
                    onFocus={onFocus}
                    onBlur={this.handleInputBlur}
                />
                {suffix ? <div className={styles.suffix}>{suffix}</div> : null}
                <Stepper
                    className={styles.stepper}
                    data-automation-id="NUMBER_INPUT_STEPPER"
                    onUp={this.handleIncrement}
                    onDown={this.handleDecrement}
                    disableUp={disableIncrement}
                    disableDown={disableDecrement}
                />
            </div>
        );
    }

    private validate(value?: number) {
        const min = getPropWithDefault(this.props, 'min');
        const max = getPropWithDefault(this.props, 'max');
        return isNumber(value) ? Math.min(max, Math.max(min, value)) : value;
    }

    private commit(value?: number) {
        const {onChange} = this.props;
        const valueInRange = this.validate(value);

        this.updateValue(valueInRange);

        if (!this.state.committed && valueInRange !== this.props.value) {
            onChange!({value: valueInRange});
            this.setState({committed: true});
        }
    }

    private revert() {
        const {value} = this.props;
        this.updateValue(value);
        this.setState({committed: true}, this.blur);
    }

    private clear() {
        this.setState({value: undefined}, this.focus);
    }

    private updateValue(next?: number) {
        const {value} = this.state;

        if (value !== next) {
            this.setState({value: next, committed: false});
        }
    }

    private stepValue(direction: Direction, multiplier = 1) {
        const value = this.currentValue;
        let step = getPropWithDefault(this.props, 'step');

        step = step * multiplier;

        const next =
            direction === Direction.Increase
                ? isNumber(value)
                    ? value + step
                    : step
                : isNumber(value)
                ? value - step
                : -step;

        this.updateValue(next);
        if (this.props.onInput) {
            this.props.onInput({value: String(next)});
        }
    }

    private handleIncrement = ({shiftKey}: Modifiers) => {
        this.stepValue(Direction.Increase, shiftKey ? 10 : 1);
    }

    private handleDecrement = ({shiftKey}: Modifiers) =>
        this.stepValue(Direction.Decrease, shiftKey ? 10 : 1);

    private handleFocus: React.FocusEventHandler<HTMLElement> = () => {
        this.setState({focus: true});
    };

    private handleBlur: React.FocusEventHandler<HTMLElement> = () => {
        this.setState({focus: false});
    };

    private handleInputKeyDown: React.KeyboardEventHandler<HTMLElement> = e => {
        if (this.input === document.activeElement) {
            switch (e.keyCode) {
                case KeyCodes.up:
                    this.stepValue(Direction.Increase, e.shiftKey ? 10 : 1);
                    e.preventDefault();
                    break;
                case KeyCodes.down:
                    this.stepValue(Direction.Decrease, e.shiftKey ? 10 : 1);
                    e.preventDefault();
                    break;
            }
        }

        if (!this.props.useKeyboard) {
            return;
        }

        if (
            document.activeElement !== this.input &&
            e.key.length === 1 &&
            !isNaN(Number(e.key))
        ) {
            return this.clear();
        }
        switch (e.keyCode) {
            case KeyCodes.enter:
                if (document.activeElement === this.input) {
                    this.setActive();
                } else {
                    this.focus();
                }
                e.preventDefault();
                break;
            case KeyCodes.esc:
                this.revert();
                e.preventDefault();
                break;
        }
    };

    private focus() {
        if (this.input) {
            this.input.focus({preventScroll: true});
        }
    }

    private blur() {
        if (this.props.isActive) {
            this.setActive();
        } else if (this.input) {
            this.input.blur();
        }
    }

    private setActive() {
        if (this.node) {
            this.node.focus({preventScroll: true});
        }
    }

    private handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        this.commit(this.state.value);
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    };

    private handleInputChange: React.ChangeEventHandler<
        HTMLInputElement
    > = e => {
        const {onInput} = this.props;
        const value = e.target.value;
        const next = value !== '' ? Number(e.target.value) : undefined;

        this.updateValue(next);
        onInput!({value});
    };
}
