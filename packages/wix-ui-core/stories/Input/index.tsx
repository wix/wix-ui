import * as React from 'react';
import {Input} from '../../src/components/Input';
import commonStyle from '../../src/components/Input/InputStyle.st.css';

export class InputStory extends React.Component<{},{}> {
  render() {
    return (
      <div style={{height: '100px', width: '100px'}}>
        <Input {...commonStyle('root')}/>
      </div>
    );
  }
}