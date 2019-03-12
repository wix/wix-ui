import {Component} from 'react';

export type GlobalEventProps = {
    [EventName in keyof WindowEventMap]?: (
        event: WindowEventMap[EventName]
    ) => void
};

export class GlobalEventBase extends Component<GlobalEventProps> {
    protected useCapture: boolean;

    public shouldComponentUpdate() {
        return false;
    }

    public componentDidMount() {
        this.forEachEvent((name, listener) => this.subscribe(name, listener));
    }

    public componentWillUnmount() {
        this.forEachEvent((name, listener) => this.unsubscribe(name, listener));
    }

    public componentDidUpdate() {
        this.forEachEvent((name, listener) => {
            if (listener !== this.props[name]) {
                this.unsubscribe(name, listener);
                this.props[name] &&
                    this.subscribe(name, this.props[name] as EventListener);
            }
        });
    }

    public render() {
        return null;
    }

    private forEachEvent(
        fn: (name: keyof GlobalEventProps, listener: EventListener) => void
    ) {
        (Object.keys(this.props).filter(name => name !== 'children') as Array<
            keyof GlobalEventProps
        >).forEach(name => fn(name, this.props[name] as EventListener));
    }

    private subscribe(event: string, listener: EventListener) {
        window && window.addEventListener(event, listener, this.useCapture);
    }

    private unsubscribe(event: string, listener: EventListener) {
        window && window.removeEventListener(event, listener, this.useCapture);
    }
}

export class GlobalEvent extends GlobalEventBase {
    protected useCapture = false;
}

export class GlobalEventCapture extends GlobalEventBase {
    protected useCapture = true;
}
