export const SimpleExample = `
import * as React from 'react';
import { TagsList, Tag } from 'wix-ui-core/tags-list';

class TagsListExample extends React.Component {
  handleTagChange = () => {};

  render() {
    return (
      <TagsList>
        <Tag 
          name="first-tag" 
          onChange={this.handleTagChange} 
          value="example value">
          First tag
        </Tag>
        <Tag
          name="second-tag"
          onChange={this.handleTagChange}
          value="another example">
          Second tag
        </Tag>
        <Tag
          name="third-tag"
          onChange={this.handleTagChange}
          value="one more example">
          Third tag
        </Tag>
      </TagsList>
    );
  }
}`;
