import * as React from 'react';
import {VBox, VBoxProps} from '../../src/components/StylableVBox/VBox';
import commonStyle from '../../src/components/StylableVBox/VBoxStyle.st.css';

export class VBoxStory extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{width: '50px', border: '2px solid green'}}>
        <VBox
          {...commonStyle('root') }
          data-hook="storybook-vbox"
          horizontalAlignment="center"
          spacing={100}
        >
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
        </VBox>
      </div>
    );
  }
}
