import * as React from 'react';

const style = {
  overflow: 'hidden',
  border: '3px solid #f3f3f3',
  borderRadius: '50%',
  borderTop: '3px solid #3498db',
  width: '72px',
  height: '72px',
  marginLeft: '36px',
};

//const ExampleLoader = () => <div style={style}>loader</div>
class ExampleLoader extends React.Component {
  public displayName =  'ExampleLoader';
  render() {
    return <div style={style}>loader</div>;
  }
}

export {ExampleLoader};
