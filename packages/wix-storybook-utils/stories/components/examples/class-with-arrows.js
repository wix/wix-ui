/* eslint-disable no-undef */
import React from "react";

import {
  Lorem,
  ipsum,
  dolor,
  sit,
  amet,
  consectetur,
  adipisicing,
  elit,
  Cumque,
  sapiente,
  magni,
  aliquam,
  voluptates,
  a,
  fuga,
  esse,
  asperiores,
  iste,
  officia,
  porro
} from "somewhere";

class Component extends React.Component {
  state = { value: "test" };
  onChange = event => this.setState({ value: event.target.value });

  render() {
    return (
      <div>
          <span style={{color: 'white'}}>Direction is {isRtl ? 'rtl' : 'ltr'}</span><br />
        <input value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}

render(
  <div
    style={{
      background: "teal",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 300,
      height: 300
    }}
    children={<Component />}
  />
);
