import * as React from 'react';
import {AddressInput} from './AddressInput';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {GoogleMapsClientStub} from './GoogleMapsClientStub';
import * as helper from './AddressInputTestHelper';
import {Simulate} from 'react-dom/test-utils';
import {queryHook, queryHookAll} from 'wix-ui-test-utils/dom';
import * as waitForCond from 'wait-for-cond';

GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

export class AddressInputDriver {
  constructor(public root: HTMLElement) { }

  get value() {
    return this.root.querySelector('input').value;
  }

  type(value) {
    const input = this.root.querySelector('input');
    Simulate.click(input);
    input.value = value;
    Simulate.change(input);
  }

  selectOption(index) {
    const option = queryHookAll(this.root, 'option')[index];
    Simulate.click(option);
  }

  waitForContentElement() {
    return waitForCond(() => queryHook(this.root, 'popover-content'));
  }

  waitForValue(value) {
    return waitForCond(() => this.value === value);
  }
}


class Wrapper extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleOnSelect = (e) => {
    const {address} = e;
    this.setState({value: address.formatted});
    this.props.onSelect && this.props.onSelect(e);
  };

  render() {
    return (<div>
      <AddressInput
        value={this.state.value}
        Client={GoogleMapsClientStub}
        onSelect={this.handleOnSelect}
        apiKey="a"
        lang="en"
        data-hook="address-input"
      />
    </div>);
  }
}

describe('AddressInput integration tests', () => {
  const container = new ReactDOMTestContainer().unmountAfterEachTest();
  const onSelectSpy = jest.fn();
  beforeEach(() => {
    onSelectSpy.mockReset();
  });

  describe('Controlled component behavior', () => {
    it('Should get value from parent component', async () => {
      await container.render(<Wrapper onSelect={onSelectSpy}/>);
      const driver = new AddressInputDriver(container.node);
      driver.type('n');
      await driver.waitForContentElement();
      driver.selectOption(0);
      await driver.waitForValue(helper.ADDRESS_1.description);
      driver.type('n');
      await driver.waitForContentElement();
      driver.selectOption(0);
      await driver.waitForValue(helper.ADDRESS_1.description);
      expect(onSelectSpy).toHaveBeenCalledTimes(2);
    });
  });
});