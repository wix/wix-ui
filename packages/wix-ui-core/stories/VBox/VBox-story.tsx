import * as React from 'react';
import {VBox, VBoxProps} from '../../src/components/StylableVBox/VBox';
import commonStyle from '../../src/components/StylableVBox/VBoxStyle.st.css';

export class VBoxStory extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>VBox with center alignment and 100px spacing</h1>
        <div style={{width: '300px', border: '2px solid green'}}>
          <VBox
            {...commonStyle('root') }
            data-hook="storybook-vbox"
            horizontalAlignment="center"
            spacing={100}
          >
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
          </VBox>
        </div>
        <h1>VBox with left alignment and 50px spacing</h1>
        <div style={{width: '300px', border: '2px solid green'}}>
          <VBox
            {...commonStyle('root') }
            horizontalAlignment="left"
            spacing={50}
          >
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
          </VBox>
        </div>
        <h1>VBox with right alignment and 20px spacing</h1>
        <div style={{width: '300px', border: '2px solid green'}}>
          <VBox
            {...commonStyle('root') }
            horizontalAlignment="right"
            spacing={20}
          >
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
          </VBox>
        </div>
      </div>
    );
  }
}
