import * as React from 'react';
import {Image} from '../../src/components/Image';

function createImage() {
  return <Image resizeMode='fill' src="http://betteryouthministry.com/wp-content/uploads/2015/06/Have-Fun-1.png" />;
}

const imageStyle: React.CSSProperties = {
  border: '1px solid yellow',
  height: '100px',
  width: '100px'
};

export class ImageStory extends React.PureComponent {
  render() {
    return (
      <div style={imageStyle}>
        {createImage()}
      </div>
    );
  }
}
