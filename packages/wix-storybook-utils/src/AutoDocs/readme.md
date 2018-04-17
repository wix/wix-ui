# `<AutoDocs/>`

Don't waste time manually typing what props your component accepts.
Instead, use `<AutoDocs/>` and get documentation automatically!

This way documentation will always reflect the actual implementation.

> `<AutoDocs/>` is only a utility component for usage within
> `wix-style-react` library. It is not exported and should not be used
> in other projects.


All you need is:
* `import YourComponentSource from '!raw-loader!/Components/YourComponent'`
* `<AutoDocs source={YourComponentSource}/>`

`AutoDocs` needs raw component source as string so it can parse it.
Hence the usage of `raw-loader`


### Usage

```js
import AutoDocs from './stories/utils/Components/AutoDocs';
import MyComponentSource from '!raw-loader!./src/MyComponent';

storiesOf('Components', module)
  .add('MyComponent' () => <AutoDocs source={MyComponentSource}/>);
```

> **NOTE**: ensure `MyComponentSource` is the actual source and not something like `export {default} from './DatePicker.js';`

### Documentation in components

in order for `AutoDocs` to shine, your component should have these things:

* a description:

  above your component type a comment within `/**` and `*/`

  ```js
  /**
    * This is `MyComponent`, and this is a description for it
    */
  const MyComponent = ({some, thing}) => {
    // ...
  ```

* `propTypes` (either `MyComponent.propTypes = {}` or `static propTypes = {}`):

  ```js
  MyComponent.propTypes = {
    /** this is prop called `some` it does few things */
    some: string.isRequired,

    /** this prop is very picky it does not accept everything */
    thing: oneOf(['one', 'or', 'another']).isRequired
  };
  ```

* `defaultProps` (either `MyComponent.defaultProps = {}` or `static defaultProps = {}`):

  ```js
  MyComponent.defaultProps = {
    some: 'just a string',
    thing: 'another'
  };
  ```

* `displayName` (either `MyComponent.displayName = 'MyComponent'` or `static displayName = 'MyComponent'`)
