import * as React from 'react';

import cx from 'classnames';
import style from './draggable-list.st.css';

export interface DraggableProps {
    className?: string;
    hoverable?: boolean;
    draggable?: boolean;
    onDragStart?: (index: number) => void;
    onDragEnter?: (index: number) => void;
    onDragEnd?: (index: number) => void;
    index: number;
    children: React.ReactElement;
}

export interface DraggableState {
    dragging: boolean;
    hidden: boolean;
}

export interface DraggableStyleStates extends StateMap {
    hidden: boolean;
    dragging: boolean;
    draggable: boolean;
    hoverable: boolean;
}

export class Draggable extends React.Component<DraggableProps, DraggableState> {
    public state = {
        dragging: false,
        hidden: false,
        offset: 0
    };

    private frameId: number;
    private dragImage: HTMLElement | null = null;

    public componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
    }
    public render() {
        const {hoverable, draggable, index, children, ...props} = this.props;
        const {dragging, hidden} = this.state;
        const child = React.Children.only<DraggableProps['children']>(children);
        const effectiveDraggable =
            'draggable' in child.props ? child.props.draggable : draggable;
        return React.cloneElement(child, {
            ...props,
            'data-automation-id': cx(
                `LIST_ITEM_${index}`,
                child.props['data-automation-id']
            ),
            styleStates: {
                hidden,
                dragging,
                draggable: Boolean(effectiveDraggable),
                hoverable: Boolean(hoverable)
            },
            draggable: effectiveDraggable,
            onDragStart: effectiveDraggable ? this.onDragStart : null,
            onDragEnd: effectiveDraggable ? this.onDragEnd : null,
            onDragEnter: effectiveDraggable ? this.onDragEnter : null
        });
    }

    private onDragStart = (e: React.DragEvent<HTMLElement>) => {
        if (!this.props.draggable) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.effectAllowed = 'move';

        this.setState({dragging: true});

        if (e.dataTransfer.setDragImage) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.pageX - rect.left - window.scrollX;
            const y = e.pageY - rect.top - window.scrollY;
            this.dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
            this.dragImage.classList.add(style.ghost);
            this.dragImage.style.width = e.currentTarget.clientWidth + 'px';
            this.dragImage.style.height = e.currentTarget.clientHeight + 'px';
            document.body.appendChild(this.dragImage);
            e.dataTransfer.setDragImage(this.dragImage, x, y);
        }

        const {onDragStart, index} = this.props;

        // we need to update state in next tick to keep original styles in "dragging" effect of item
        cancelAnimationFrame(this.frameId);
        this.frameId = requestAnimationFrame(() => {
            this.setState({hidden: true});
            if (onDragStart) {
                onDragStart(index);
            }
        });
    };

    private onDragEnter = () => {
        const {onDragEnter, index} = this.props;
        onDragEnter && onDragEnter(index);
    };

    private onDragEnd = () => {
        const {onDragEnd, index} = this.props;
        if (this.dragImage) {
            this.dragImage.parentNode!.removeChild(this.dragImage);
            this.dragImage = null;
        }
        if (onDragEnd) {
            onDragEnd(index);
        }
        // preventing FF from navigating the dragging urls
        cancelAnimationFrame(this.frameId);
        this.frameId = requestAnimationFrame(() => {
            this.setState({dragging: false, hidden: false});
        });
    };
}
