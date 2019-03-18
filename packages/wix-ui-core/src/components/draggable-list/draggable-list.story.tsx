import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import React from 'react';

import {PatchState, StateProvider} from '../../story-utils';

import {DraggableList, DraggableListItem} from '.';

interface State {
    items: React.ReactNodeArray;
}

class StatefullList extends StateProvider<State> {}

const onDrop = ({items}: State, change: PatchState<State>) => (
    indexes: number[]
) => {
    action('onDrop')(indexes);
    change(
        indexes.reduce<{items: React.ReactNode[]}>(
            (state, index) => {
                state.items.push(items[index]);
                return state;
            },
            {items: []}
        )
    );
};

storiesOf('ui/DraggableList', module)
    .add('default', () => (
        <StatefullList initial={{items: ['one', 'two', 'tree', 'four']}}>
            {({items}, change) => (
                <DraggableList onDrop={onDrop({items}, change)}>
                    {items.map(item => (
                        <DraggableListItem>{item}</DraggableListItem>
                    ))}
                </DraggableList>
            )}
        </StatefullList>
    ))
    .add('non-draggable item', () => (
        <StatefullList initial={{items: ['one', 'two', 'tree', 'four']}}>
            {({items}, change) => (
                <DraggableList onDrop={onDrop({items}, change)}>
                    {items.map(item => (
                        <DraggableListItem draggable={item !== 'two'}>
                            {item}
                        </DraggableListItem>
                    ))}
                </DraggableList>
            )}
        </StatefullList>
    ))
    .add('large', () => (
        <StatefullList initial={{items: ['one', 'two', 'tree', 'four']}}>
            {({items}, change) => (
                <DraggableList
                    className="large"
                    onDrop={onDrop({items}, change)}
                >
                    {items.map(item => (
                        <DraggableListItem>{item}</DraggableListItem>
                    ))}
                </DraggableList>
            )}
        </StatefullList>
    ));
