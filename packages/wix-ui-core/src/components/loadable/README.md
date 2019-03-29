# Loadable

A `React.Component` which is designed to make lazy-loading easy.<br/>
It will make part of the code bundled into a separate chunk and load after `shouldLoadComponent` will be set to `true`.
It's based on the render props approach. Just use function wrapper as a child of Loadable component with loaded component as an argument.
The main feature is that it could avoid some breaking changes for your codebase.

React-loadable or other libraries for lazy loading is based on dynamic imports + Promises apprach. So it will render lazy loaded component only on the next tick. But if you want to move to separate chunks some code gradually, you would like to support both approaches - sync and async.


## API
- `shouldLoadComponent` - a boolean property that triggers component from `loader` callback to be loaded. After `shouldLoadComponent` is set to `true`, `loader` will be called and children prop rendered with resolved component from the module. If it is set to `false`, `defaultComponent` will be rendered.  
- `loader` - a function that loads your module. Should return Promise (via `import()`), React.Component or Module with a React.Component. For example: `import('./Component')` or `require('./Component')`.  
- `componentKey` - a string, that specifies the exported name of the component. For example, if component you want to load with lazy loading has `export const Tooltip = Tooltip`, then you probably want to target `componentKey="Tooltip"`.  
- `defaultComponent` - component to show if shouldLoadComponent is not `true` or component is loading and `loadingComponent` was not specified.  
- `loadingComponent` - component to show when loading happening. Optional. Will use - `defaultComponent` if nothing specified.  
- `children` - callback that will be called after lazy loading finished. Receives single argument - loaded component.  

## Usage Example
In order to create the lazy loading component:

```js
import Loadable from 'wix-ui-core/dist/es/src/loadable';

// You probably want to specify child props and module structure in part of the loaded component.
class LoadableTooltip extends Loadable<
  TooltipProps,
  { Tooltip: React.ComponentType<TooltipProps> }
> {}

const LazyLoadedTooltip = ({ shouldUseAsync, shouldLoadComponent }) => (
  <LoadableTooltip
    loader={() => shouldUseAsync ? import('../tooltip') : require('../tooltip')}
    defaultComponent={<span>Not loaded yet!</span>}
    componentKey="Tooltip"
    shouldLoadComponent={shouldLoadComponent}
  >
    {Tooltip => {
      return (
        <Tooltip><span>Loaded!</span></Tooltip>
      );
    }}
  </LoadableTooltip>
);
```
