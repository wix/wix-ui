import * as React from 'react';
import {Label} from '../../src/components/Label/Label';
import commonStyle from '../../src/components/Label/LabelStyle.st.css';

export class LabelStory extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{height: '100px', width: '100px'}}>
        <Label
          {...commonStyle('root') }
          data-hook="storybook-label"
        >
         HELLO
        </Label>
      </div>
    );
  }
}
