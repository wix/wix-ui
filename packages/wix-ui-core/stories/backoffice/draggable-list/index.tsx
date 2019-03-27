import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { DraggableList, DraggableListItem } from '../../../src/components/draggable-list';
import { backofficeTheme, draggableList, draggableListItem } from '../../../src/themes/backoffice';

const DraggableListStory = () => (
  <div style={{ margin: '0px 0 16px', paddingLeft: '20px' }}>
    <CodeShowcase title="Default" theme={backofficeTheme}>
      <DraggableList className={draggableList()}>
        <DraggableListItem className={draggableListItem()}>Item 1</DraggableListItem>
        <DraggableListItem className={draggableListItem()}>Item 2</DraggableListItem>
        <DraggableListItem className={draggableListItem()}>Item 3</DraggableListItem>
      </DraggableList>
    </CodeShowcase>

    <CodeShowcase title="Not Draggable" theme={backofficeTheme}>
      <DraggableList className={draggableList()}>
        <DraggableListItem className={draggableListItem()}>Item 1</DraggableListItem>
        <DraggableListItem draggable={false} className={draggableListItem()}>Item 2 (Not Draggable)</DraggableListItem>
        <DraggableListItem className={draggableListItem()}>Item 3</DraggableListItem>
      </DraggableList>
    </CodeShowcase>
  </div>
)

export default DraggableListStory;