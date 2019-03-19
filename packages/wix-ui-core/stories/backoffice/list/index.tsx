import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { List, ListItem } from '../../../src/components/list';
import { list, listItem, backofficeTheme } from '../../../src/themes/backoffice';

const ListStory = () => (
  <div style={{ margin: '0px 0 16px', paddingLeft: '20px' }}>
    <CodeShowcase title="Default" theme={backofficeTheme}>
      <List className={list()}>
        <ListItem className={listItem()}>Item 1</ListItem>
        <ListItem className={listItem()}>Item 2</ListItem>
        <ListItem className={listItem()}>Item 3</ListItem>
      </List>
    </CodeShowcase>
  </div>
)

export default ListStory;