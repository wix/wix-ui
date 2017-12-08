# Themes structure and architecture

## The example
Below is a a simple example on how the themes eco-system works.
In the example - `Button` is a simple `core` component with a green text that can be wrapped by a `backoffice` theme.
The backoffice theme exposes a `Button` component that changes the color according to `skin` prop.

### wix-ui-core/src/Components/Button.tsx
```
export const Button = ({classes}) => (
  <button className={classes.button}>
    click me
  </button>
);
```

### wix-ui-core/src/Components/theme.ts
```
export const core = {
  color: 'red'
};
```

### wix-ui-core/src/Components/styles.ts
```
import {core} from './theme';

export const styles = theme => {
  theme = defaultsDeep(theme, core);
  return {
    button: {
       color: theme.color
    }
  };
};
```

### wix-ui-core/src/Components/index.ts
```
import {withClasses} from '../withClasses';
import {styles} from './styles';
import {Button} from './Button';

export default withClasses(Button, styles);
```

In general what `withClasses()` does is wrapping the component with another HOC that expects to receive a `theme` prop.
When rendered - it generates a new style tag using `jss`(css-in-js) mechanism.

### wix-ui-backoffice/src/Components/theme.ts
```
export const theme = ({skin}) => {
  return {
    color: skin === 'primary' ? 'blue' : 'white'
  };
}
```

### wix-ui-backoffice/src/Components/index.tsx
```
import {theme} from './theme';
import {ThemedComponent} from 'wix-ui-theme';
import CoreButton from 'wix-ui-core/Button';

export const ToggleSwitch = ({size, ...coreProps}) => (
  <ThemedComponent theme={theme} size={skin}>
    <CoreButton {...coreProps}/>
  </ThemedComponent>
);
```

`ThemedComponent` component generates a `theme` props according to the component props and passes it to the core component. Read more [here](../wix-ui-theme/README.md)
