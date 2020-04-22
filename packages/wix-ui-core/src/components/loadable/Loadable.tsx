import * as React from 'react';

type Module<LoadableExports> = {
  [ModuleKey in keyof LoadableExports]: LoadableExports[ModuleKey];
};

// imported module representation.
export type LoaderMap<LoadableExports> = {
  [Key in keyof LoadableExports]?: () =>
    | LoadableExports[Key]
    | Module<LoadableExports>
    | Promise<Module<LoadableExports>>;
};

// Resolved module representation, that should be passed into render prop as an argument
export type LoadedMap<LoadableExports> = {
  [Key in keyof LoadableExports]?: LoadableExports[Key];
};

export interface LoadableProps<LoadableExports> {
  /** loader for a component. `import('./Component')` */
  loader: LoaderMap<LoadableExports>;

  children(loaded: LoadedMap<LoadableExports>): JSX.Element;

  /** component to show while not loading and `shouldLoadComponent` is false */
  defaultComponent: JSX.Element;

  /** component to show while loading */
  loadingComponent?: JSX.Element;

  /** key to access the field inside module. `default` by default */
  namedExports?: { [Key in keyof LoadableExports]?: string };

  /** key to trigger lazy-loading */
  shouldLoadComponent?: boolean;

  /** callback thats beein called when dynamic chunk is loaded */
  onLoad?(): Function;
}

export interface LoadableState<LoadableExports> {
  loaded: LoadedMap<LoadableExports>;
  isLoading: boolean;
}

export class Loadable<LoadableExports> extends React.Component<
  LoadableProps<LoadableExports>,
  LoadableState<LoadableExports>
> {
  constructor(props) {
    super(props);

    let loaded = null;

    if (props.shouldLoadComponent) {
      loaded = this.loadSyncOrAsync();
    }
    const isLoading = props.shouldLoadComponent && !loaded;

    this.state = {
      loaded,
      isLoading,
    };
  }
  componentDidUpdate(prevProps) {
    // Here we want to start loading the component only when `shouldLoadComponent` was changed
    // and we are not already loading the component.
    if (
      !this.state.loaded &&
      !prevProps.shouldLoadComponent &&
      this.props.shouldLoadComponent &&
      !this.state.isLoading
    ) {
      let loaded = null;
      loaded = this.loadSyncOrAsync();
      this.setState({ loaded, isLoading: !loaded });
    }
  }

  private readonly resolveModule = (moduleItem, key = 'default') => {
    if (typeof moduleItem === 'function') {
      return moduleItem;
    }
    if (!moduleItem[key]) {
      console.warn(
        `You have used <Loadable />, but module you are accessing via 'loader' prop has different exports. Use componentKey="${Object.keys(
          moduleItem
        ).slice(0)}" to access exported component property. `
      );
    }
    return moduleItem[key] || moduleItem;
  };
  /* For node.js environment (unit tests) it will be transpiled into sync `require`.
   We don't want to break them and allowing to have both sync and async flow according to environment.
   With webpack build (development, e2e) we'll have `import` not transpiled to `require`, which will create
   async flow. We should determine type of flow and according to it sync or async set the state.
  */
  private readonly loadSyncOrAsync = (): LoadedMap<LoadableExports> => {
    const { loader, namedExports = {} as any } = this.props;

    const resolvedModules: {
      [Key in keyof LoadableExports]?: LoadableExports[Key];
    } = {};

    const resolvedAsyncModules: {
      [Key in keyof LoadableExports]?:
        | LoadableExports[Key]
        | Promise<LoadableExports[Key]>;
    } = {};

    for (const loadableItemKey in loader) {
      const loadableItem = loader[loadableItemKey]();
      if (loadableItem instanceof Promise) {
        // Handling `import('Tooltop') -> Promise<module>`
        resolvedAsyncModules[loadableItemKey] = loadableItem
          .then(loaded =>
            this.resolveModule(loaded, namedExports[loadableItemKey])
          )
          .catch(() => {
            console.error(`Asset wasn't loaded: ${loadableItem}`);
          });
      } else {
        // Handling `require('Tooltop') -> module`
        resolvedModules[loadableItemKey] = this.resolveModule(
          loadableItem,
          namedExports[loadableItemKey]
        );
      }
    }

    const isAsyncMode = Object.keys(resolvedAsyncModules).length > 0;

    if (!isAsyncMode) {
      this.props.onLoad && this.props.onLoad();
      return resolvedModules;
    }

    const resolvedKeys = Object.keys(resolvedAsyncModules);
    Promise.all(resolvedKeys.map(key => resolvedAsyncModules[key])).then(
      modules => {
        modules.forEach((resolvedModule, index) => {
          const moduleName = resolvedKeys[index];
          resolvedModules[moduleName] = resolvedModule;
        });
        this.props.onLoad && this.props.onLoad();
        this.setState({ loaded: resolvedModules, isLoading: false });
      }
    );
    return null;
  };
  render() {
    const { loaded, isLoading } = this.state;
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

    if (!shouldLoadComponent || !loaded) {
      return defaultComponent;
    }
    // Rendering original loaded component.
    return children(loaded);
  }
}
