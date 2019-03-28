import * as React from 'react';

export interface LoadableProps<Props, Exports> {
  /** loader for a component. `import('./Component')` */
  loader():
    | Promise<{ [Key in keyof Exports]: Exports[Key] }>
    | { [Key in keyof Exports]: Exports[Key] }
    | React.ComponentType<Props>;

  children(component: React.ComponentType<Props>): JSX.Element;

  /** component to show while not loading and `shouldLoadComponent` is false */
  defaultComponent: JSX.Element;

  /** component to show while loading */
  loadingComponent?: JSX.Element;

  /** key to access the field inside module. `default` by default */
  componentKey?: string;

  /** key to trigger lazy-loading */
  shouldLoadComponent?: boolean;
}

export interface LoadableState<Props> {
  Component: React.ComponentType<Props>;
  isLoading: boolean;
}

export class Loadable<Props, Exports> extends React.Component<
  LoadableProps<Props, Exports>,
  LoadableState<Props>
> {
  constructor(props) {
    super(props);

    let Component = null;

    if (props.shouldLoadComponent) {
      Component = this.loadSyncOrAsync();
    }
    const isLoading = props.shouldLoadComponent && !Component;

    this.state = {
      Component,
      isLoading,
    };
  }
  componentDidUpdate(prevProps) {
    // Here we want to start loading the component only when `shouldLoadComponent` was changed
    // and we are not already loading the component.
    if (
      !this.state.Component &&
      !prevProps.shouldLoadComponent &&
      this.props.shouldLoadComponent &&
      !this.state.isLoading
    ) {
      let Component = null;
      Component = this.loadSyncOrAsync();
      this.setState({ Component, isLoading: !Component });
    }
  }
  /* For node.js environment (unit tests) it will be transpiled into sync `require`.
   We don't want to break them and allowing to have both sync and async flow according to environment.
   With webpack build (development, e2e) we'll have `import` not transpiled to `require`, which will create
   async flow. We should determine type of flow and according to it sync or async set the state.
  */
  private loadSyncOrAsync = (): React.ComponentType<Props> => {
    const { loader, componentKey = 'default' } = this.props;
    const Component = loader();
    // Handling `import('Tooltop') -> Promise<module>`
    if (Component instanceof Promise) {
      Component.then(resolvedModule => {
        const ModuleComponent = resolvedModule[componentKey];
        if (resolvedModule && !ModuleComponent) {
          console.warn(
            `You have used <Loadable />, but module you are accessing via 'loader' prop has different exports. Use componentKey="${Object.keys(
              resolvedModule,
            ).slice(0)}" to access exported component property. `,
          );
        }
        this.setState({ Component: ModuleComponent, isLoading: false });
      }).catch(() => {
        this.setState({ Component: null, isLoading: false });
      });
      return null;
      // Handling `require('Tooltop') -> { default: Tooltip }`
    }
    if (typeof Component !== 'function') {
      return Component[componentKey];
    }
    // Handling `require('Tooltop') -> Tooltip`
    return Component;
  };
  render() {
    const { Component, isLoading } = this.state;
    const {
      shouldLoadComponent,
      defaultComponent,
      loadingComponent,
      children,
    } = this.props;

    // Handling loader. Using defaultComponent if no loader was specified.
    if (isLoading) {
      return loadingComponent || defaultComponent;
      // Handling error or component when loading wasn't started
    }

    if (!shouldLoadComponent || !Component) {
      return defaultComponent;
    }
    // Rendering original loaded component.
    return children(Component);
  }
}
