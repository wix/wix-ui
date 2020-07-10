export const SingleSelectionExample = () => `
import * as React from 'react';
import { TagsList, Tag } from 'wix-ui-core/tags-list';

function SingleSelectionExample() {
    const [selectedTags, setSelectedTags ] = React.useState(new Set());

    function onChange(e) {
        console.log('adler12', e.target);
        setSelectedTags(new Set([e.target.value]));
    }

    return (
      <TagsList singleSelection={true} onChange={onChange} key="SingleSelectionExample">
        <Tag
          name="first-tag"
          checked={selectedTags.has('example value')}
          key="example value"
          value="example value">
          First tag
        </Tag>
        <Tag
          name="second-tag"
          checked={selectedTags.has('another value')}
          key="another example"
          value="another example">
          Second tag
        </Tag>
        <Tag
          name="third-tag"
          checked={selectedTags.has('one more example')}
          key="one more example"
          value="one more example">
          Third tag
        </Tag>
      </TagsList>
    );
}`;
