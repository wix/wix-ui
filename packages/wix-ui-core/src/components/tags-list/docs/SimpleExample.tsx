export const SimpleExample = () => `
import * as React from 'react';
import { TagsList, Tag } from 'wix-ui-core/tags-list';

class BasicExample extends React.Component {
  state = {
    selectedTags: new Set()
  };
  
  handleTagChange = e => {
    const { selectedTags } = this.state;
    const target = e.target;
    const value = target.value; 
    
    if (selectedTags.has(value)) {
      selectedTags.delete(value)
    } else {
      selectedTags.add(value);
    }
    
    console.log('adler1', e);
    
    this.setState({ selectedTags });
  };

  render() {
    const { selectedTags } = this.state;
    
    return (
      <TagsList onChange={this.handleTagChange}>
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
  }
}`;
