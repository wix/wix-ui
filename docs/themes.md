# Themes

## Consuming Components / Applying Themes

### Basic example

> some-product/src/app.js

```js
import classNames from 'classnames';
import {Button, Checkbox} 'wix-ui-core/button';
import theme from 'wix-ui-core/themes/backoffice/theme';

export const Page = () => (
  <div className={theme.root}>
    <Button>Default Button</Button>
    <Checkbox>Default Checkbox</Checkbox>
    <Button className={theme.Button.sizeSmall}>Small Button</Button>
  </div>
)
```

- Notice the imported `theme`. It is where we get the backoffice theme classes.
- Notice the `theme.root` class which used to scope all components under it, and give the the default Backoffice look.
- Notice `theme.Button.sizeSmall` class which is a **variation** that the Backoffice theme added (It is not in core component's stylesheet).

### The Theme Scoping Class

In the above example, the `theme.root` is the theme scoping class.
It allows us to have multiple themes on the same page. Which is important in Wix architecture, where all the different products are delivered as one App (no iFrame).

### Themes are NOT interchangable!

Well, it is not a relevant use-case for us to take some Page and change it's theme from say... Backoffice to ADI. And as it happens, it also won't work.

```js
import classNames from 'classnames';
import {Button, Checkbox} 'wix-ui-core/button';
// import theme from 'wix-ui-core/themes/backoffice/theme';
import theme from 'wix-ui-core/themes/adi/theme';

export const Page = () => (
  <div className={theme.root}>
    <Button>Default Button</Button>
    <Checkbox>Default Checkbox</Checkbox>
    <Button className={theme.Button.sizeSmall}>Small Button</Button>
  </div>
)
```

- It will partially work, for the components that are used with default styles.
- It won't work for the 3rd `Button` since we can not promise that `theme.Button.sizeSmall` exists in the ADI them. Each theme is free to add any variations it needs.

## Implementing Themes

### File Structure

```
wix-ui-core
|
|__src
|  |__components
|  |  |__button
|  |
|  |__themes
|     |__backoffice
|     |  |__button
|     |        button.st.css
|     |     index.ts
|     |     theme.st.css
|     |__default
|     |  |__button
|     |        button.st.css
|     |     index.ts
|     |     theme.st.css
```

### `theme.st.css`

Defines the theme scoping class.
For example:
> `wix-ui-core/src/themes/backoffice/theme.st.css`

```css
@namespace "BackofficeTheme";
.root {}
```

- The `root` class explicit definition could be dismissed (it is implicitly defined by default).
- The namespace is important in order to differentiate the resulting class name between different themes. The actuall namespaced class name in this case would be `BackofficeTheme__root` instead of `theme__root`.
  - If there are multiple themes in a page, then this is crutial.

### Theme `index.ts`

The `index.ts` should export the theme scoping class and all the component's variation classes.
The API the component's classes are exposed can vary.

## Component-Libraries

### Overview

- There are several Design Systems in Wix (Backoffice, ADI, TPA, Santa, Editor,...).
- Each Design System has corresponding Component-Library (AKA Theme Library).
- The products under a design system consume components via the corresponding Component-Library (`wix-style-react` (backoffice), `wix-ui-adi`, `wix-ui-tpa`, ...)

### The Long Transition

Since `wix-ui-core` is still evolving (not enough component), Component-Libraries have some (or lots of) components that the core doesn't have. Some component are not suitable for the core (thay are too specific), and other were simply already developed.

- We strive that any new component would be developed in the core.
- We strive that core components would replace existing components in the Component-Libraries.
- We strive that useful and well written components in the Component-Libraries, will be migrated to the core.
- We strive that consumers will use more and more core components.
- We foresee a long transition.

#### Proxying

We believe that consumers of a Component-Library should import everything they need from one-place, and not from multiple component-libraries.

So when we wish consumers to start using a new component from the core, then we would simply proxy that component in the Component-Library.

> backoffice/components/TimeInput.js

```js
export {TimeInput} from 'wix-ui-core';
```
