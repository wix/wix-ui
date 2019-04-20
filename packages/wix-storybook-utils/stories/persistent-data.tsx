import * as React from 'react';
import { getData, saveData } from '../src/PersistentData';
import CodeBlock from '../src/CodeBlock';

export class PersistentData extends React.Component {
  state = {
    keyName: 'someKey',
    valueToSave: 'some value',
    savedData: '',
  };

  render() {
    const { keyName, valueToSave, savedData } = this.state;
    return (
      <div>
        <h1>Save data in the query param (for easy sharing)</h1>
        <CodeBlock
          source={`
import {(getData, saveData)} from 'wix-storybook-utils/PersistentData';\n
saveData('key', 'value');
getData('key');
            `}
        />
        <div>
          <label htmlFor="keyName">enter the key name:</label>
          <input
            id="keyName"
            value={keyName}
            onChange={e => this.setState({ keyName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="valueToSave">enter the value to save:</label>
          <input
            id="valueToSave"
            value={valueToSave}
            onChange={e => this.setState({ valueToSave: e.target.value })}
          />
        </div>
        <button
          onClick={() => {
            saveData(keyName, valueToSave);
          }}
        >
          save data to url
        </button>
        <hr />
        <div>
          <p>Get the saved data from url according to the key name</p>
          <button
            onClick={() => this.setState({ savedData: getData(keyName) })}
          >
            get data
          </button>
          <p>
            <strong>saved value from url: </strong> {savedData}
          </p>
        </div>
      </div>
    );
  }
}
