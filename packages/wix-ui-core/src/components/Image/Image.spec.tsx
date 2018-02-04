import * as React from 'react';
import {Image} from './';

describe('Image', () => {
  function createImage() {
    return <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/BlueberryMuffin.jpg/1200px-BlueberryMuffin.jpg" />;
  }

  it('renders a muffin to the screen', () => {
    createImage();
  });

});
