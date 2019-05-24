import * as React from 'react';
import { Loadable } from '../../src/components/loadable';

class LoadableModule extends Loadable<{
  LoadedAsync: React.ComponentType<{}>;
}> {}

class LazyLoadedModule extends React.Component {
  state = { shouldLoadComponent: false };
  loadComponent = () => {
    this.setState({ shouldLoadComponent: true });
  };
  render() {
    return (
      <React.Fragment>
        <LoadableModule
          loader={{
            LoadedAsync: () => import('./LoadedAsync'),
          }}
          defaultComponent={<span>Not loaded yet!</span>}
          namedExports={{
            LoadedAsync: 'LoadedAsync',
          }}
          shouldLoadComponent={this.state.shouldLoadComponent}
        >
          {({ LoadedAsync }) => <LoadedAsync />}
        </LoadableModule>
        <button onClick={this.loadComponent}>Load async</button>
      </React.Fragment>
    );
  }
}

export default LazyLoadedModule;
