# Themes Structure and Architecture

## The example
Below is a a simple example on how the themes eco-system works.
- In the example - `button` is a simple `core` component with an extesible font-size.
- The backoffice theme defines a Button stylesheet that extends the 'core' component's Stylesheet, and offers a few font sizes.
  - We also expose js helper functions for applying the theme classes.
- A Consumer of the backoffice theme uses the core component and the backoffice theme stylesheet.

> Currently (and in this example as well) the theme sits inside `wix-ui-core`. It may bbe later moved to its own package.

## The core library

### wix-ui-core/src/components/button/button.st.css
```css
.root {
  font-size: 10px;
}
```

### wix-ui-core/src/themes/backoffice/theme.st.css
```css
@namespace "BackofficeTheme";
```

### wix-ui-core/src/themes/backoffice/button.st.css
```
:import {
  -st-from: '../theme.st.css';
  -st-default: BackofficeTheme;
}

:import {
  -st-from: '../../../components/button/button.st.css';
  -st-default: Button;
}

BackofficeTheme .button {
  -st-extends: Button
}

BackofficeTheme .button.sizeSmall {
  font-size: 8px;
}

BackofficeTheme .button.sizeMedium {
  font-size: 14px;
}
```

### some-sonsuming-app/src/page-with-button.js
```js
import classNames from "classnames";
import {Button} 'wix-ui-core/button';
import backofficeTheme from 'wix-ui-core/themes/backoffice/theme.st.css';
import buttonTheme from 'wix-ui-core/themes/backoffice/button.st.css';

export const Page = () => (
  <div className={backofficeTheme.root}>
    <Button className={classNames(buttonTheme.button, buttonTheme.sizeMedium)}>
      Click Me
    </Button>
  </div>
)
```
