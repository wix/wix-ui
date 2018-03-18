import * as React from 'react';
import {HBox, HBoxProps} from '../../src/components/StylableHBox/HBox';
import commonStyle from '../../src/components/StylableHBox/HBoxStyle.st.css';

export class HBoxStory extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>HBox with center alignment and 150px spacing</h1>
        <div style={{height: '300px', border: '2px solid green'}}>
          <HBox
            {...commonStyle('root') }
            data-hook="storybook-hbox"
            verticalAlignment="center"
            spacing={150}
          >
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
          </HBox>
        </div>
        <h1>HBox with bottom alignment and 50px spacing</h1>
        <div style={{height: '300px', border: '2px solid green'}}>
          <HBox
            {...commonStyle('root') }
            verticalAlignment="bottom"
            spacing={50}
          >
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
          </HBox>
        </div>
        <h1>HBox with top alignment and 20px spacing</h1>
        <div style={{height: '300px', border: '2px solid green'}}>
          <HBox
            {...commonStyle('root') }
            verticalAlignment="top"
            spacing={200}
          >
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
            <div style={{height: '50px', width: '50px', backgroundColor: 'lightgrey'}}>hello</div>
          </HBox>
        </div>
      </div>
    );
  }
}
