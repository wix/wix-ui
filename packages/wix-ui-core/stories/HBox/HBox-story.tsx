import * as React from 'react';
import {HBox, HBoxProps} from '../../src/components/StylableHBox/HBox';
import commonStyle from '../../src/components/StylableHBox/HBoxStyle.st.css';

export class HBoxStory extends React.Component<{HBoxProps?}, {}> {
  render() {
    return (
      <div style={{height: '300px', border: '2px solid green'}}>
        <HBox
          {...commonStyle('root') }
          data-hook="storybook-hbox"
          verticalAlignment="center"
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
        </HBox>
      </div>
    );
  }
}
