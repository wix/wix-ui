# wix-ui-jss

This package uses [jss](https://github.com/cssinjs/jss) (css-in-js mechanism) in order to enrich components from `wix-ui-core` library with styles.

## API
`withClasses(Component, styles)` is an HOC wrapping the component and passing it a `classes` prop.
the `classes` prop is generated from the data passed to `styles` (the theme).
When rendered - it generates a new style tag using `jss` (css-in-js) mechanism.
Note that by using `withClasses` on some component, it will get a unique id as a side effect for performance purposes. 

`styles` is a style template written in css-in-js syntax (will be explained after).
 

## Example
We wish to create a themed component of the core Button component in `wix-ui-core`. For simplicity, let's say it has the following implementation:

```javascript
export const Button = ({classes}) => (
  <button className={classes.someClass}>
    click me
  </button>
);
```

The Button expects to receive a `classes` prop by some magical way. This is where `wix-ui-jss` kicks in.

Let's assume `theme` is an object which specifies the values for the style. for example:

```javascript
const theme = {
  fontSize: '10px',
  color: 'green'
}
```

The core Button has also `styles` which is a function that gets the theme object and uses it in order to create a style template written in css-in-js syntax:

```javascript
export const styles = theme => ({
  someClass: {
    fontSize: theme.fontSize,
    color: theme.color
  }
});
```

Now, in order to pass the `classes` prop to the Button, we simply use the `withClasses` API to generate the HOC:

```javascript
import {withClasses} from 'wix-ui-jss';
import {styles} from './styles';
import Button from './Button';

export default withClasses(Button, styles);
```

## Testkit

In order to test the styles of the components which are being styled by the jss style element that was injected to the DOM, you can use the `DomTestkit`.

Lets see for example how we can test that the themed Button we just created above has a green color.

```javascript
import {DomTestkit} from 'wix-ui-jss/domTestkit';
import {mount} from 'enzyme';

describe('Button', () => {
  it('should have green color', () => {
    const wrapper = mount(<ThemedButton/>);
    const domTestkit = new DomTestkit({componentId: wrapper.node.id});

    expect(domTestkit.getCssValue({className: 'someClass', property: 'color'})).toBe('green');
  });
});
```
