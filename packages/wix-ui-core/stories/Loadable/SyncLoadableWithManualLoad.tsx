import * as React from 'react';
import { Loadable } from '../../src/components/loadable';

class LoadableModule extends Loadable<
  {},
  { LoadedSync: React.ComponentType<{}> }
> {}

class LazyLoadedModule extends React.Component {
  state = { shouldLoadComponent: false };
  loadComponent = () => {
    this.setState({ shouldLoadComponent: true });
  };
  render() {
    return (
      <React.Fragment>
        <LoadableModule
          loader={() => require('./LoadedSync')}
          defaultComponent={<span>Not loaded yet!</span>}
          componentKey="LoadedSync"
          shouldLoadComponent={this.state.shouldLoadComponent}
        >
          {Loaded => <Loaded />}
        </LoadableModule>
        <button onClick={this.loadComponent}>Load async</button>
      </React.Fragment>
    );
  }
}

export default LazyLoadedModule;
