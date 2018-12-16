import * as React from 'react';

export class Image extends React.PureComponent {
  render() {
    return (
        <img className={"picture"}
        src="/media/examples/grapefruit-slice-332-332.jpg"
        alt="Grapefruit slice atop a pile of other slices" />
    );
  }
}
