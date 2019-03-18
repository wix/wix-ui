import * as React from 'react';

import cx from 'classnames';

import {List} from '../list';
import {Draggable} from './draggable';

import style from './draggable-list.st.css';

function getDefaultIndexes(children: React.ReactNode) {
    return new Array(React.Children.count(children))
        .fill(0)
        .map((_, index) => index);
}

export interface DraggableListProps {
    className?: string;
    children?: React.ReactElement;
    draggable?: boolean;
    onDrop?: (indexes: number[]) => void;
}

export interface DraggableListState {
    children: React.ReactNode;
    indexes: number[];
    dragIndexFrom: number | null;
    lastDragIndex: number | null;
}

export class DraggableList extends React.Component<
    DraggableListProps,
    DraggableListState
> {
    public static defaultProps: Partial<DraggableListProps> = {
        draggable: true
    };

    public static getDerivedStateFromProps(
        props: DraggableListProps,
        state: DraggableListState
    ) {
        const childrenChanged = props.children !== state.children;
        return {
            children: childrenChanged ? props.children : state.children,
            indexes: childrenChanged
                ? getDefaultIndexes(props.children)
                : state.indexes
        };
    }

    public state: DraggableListState = {
        children: this.props.children,
        indexes: getDefaultIndexes(this.props.children),
        dragIndexFrom: null,
        lastDragIndex: null
    };

    public render() {
        const {indexes, dragIndexFrom} = this.state;
        const childrenArray = React.Children.toArray(this.props.children);
        const draggable = this.props.draggable && childrenArray.length > 1;
        const dragging = dragIndexFrom !== null;

        return (
            <List
                {...style(cx('root list', this.props.className), {dragging})}
                data-automation-id="DRAGGABLE_LIST"
                draggable={draggable}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
            >
                {indexes.map(index => (
                    <Draggable
                        className="item"
                        key={index}
                        index={index}
                        hoverable={!dragging}
                        draggable={draggable}
                        onDragStart={this.start}
                        onDragEnter={this.swap}
                        onDragEnd={this.end}
                    >
                        {childrenArray[index] as React.ReactElement}
                    </Draggable>
                ))}
            </List>
        );
    }

    private start = (dragIndexFrom: number) => this.setState({dragIndexFrom});

    private swap = (dragIndexTo: number) => {
        const {dragIndexFrom, lastDragIndex} = this.state;
        if (dragIndexFrom === null || dragIndexTo === lastDragIndex) {
            return;
        }
        const indexes = Array.from(this.state.indexes);
        const f = indexes.indexOf(dragIndexFrom);
        const t = indexes.indexOf(dragIndexTo);
        indexes[f] = dragIndexTo;
        indexes[t] = dragIndexFrom;
        this.setState({
            indexes,
            lastDragIndex: dragIndexTo
        });
    };

    private onDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    };

    private onDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    };

    private end = () => {
        if (this.props.onDrop) {
            this.setState({
                indexes: getDefaultIndexes(this.props.children),
                dragIndexFrom: null,
                lastDragIndex: null
            });
            this.props.onDrop(this.state.indexes);
        } else {
            this.setState({
                dragIndexFrom: null,
                lastDragIndex: null
            });
        }
    };
}
