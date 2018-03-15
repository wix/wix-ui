import * as React from 'react';
import {VBox, VBoxProps} from '../../src/components/StylableVBox/VBox';
import commonStyle from '../../src/components/StylableVBox/VBoxStyle.st.css';

export class VBoxStory extends React.Component<{VBoxProps?}, {}> {
  render() {
    return (
      <div style={{height: '300px', border: '2px solid green'}}>
        <VBox
          {...commonStyle('root') }
          data-hook="storybook-vbox"
          horizontalAlignment="center"
          spacing={150}
          {...this.props}
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
