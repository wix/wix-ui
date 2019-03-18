import * as React from 'react';

import {storiesOf} from '@storybook/react';

import {List, ListItem} from './list';

storiesOf('ui/List', module)
    .add('default', () => (
        <List>
            <ListItem>One</ListItem>
            <ListItem>Two</ListItem>
            <ListItem>Three</ListItem>
        </List>
    ))
    .add('large', () => (
        <List className="large">
            <ListItem>One</ListItem>
            <ListItem>Two</ListItem>
            <ListItem>Three</ListItem>
        </List>
    ));
