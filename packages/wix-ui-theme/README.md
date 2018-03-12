# wix-ui-theme

If you wish to implement a new component with some specific theme, the best choice for you would be to take a core component from [wix-ui-core](https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core), and to add your own theme to it.

This package provides a nice API for creating a themed component from a core component with important performance optimizations.

## Why do we need themes
- Prevent code duplication by having one core components code base.
- Make it easy to style components to match the different designs.

## Themed libraries
The themes we currently have at Wix (WIP):
- [Backoffice](https://github.com/wix/wix-ui-backoffice)
- [Tpa](https://github.com/wix/wix-ui-tpa)

## Creating a new theme
A theme is simply an object that we need to pass to the core component as a prop. The core component has no style by definition, or at least only a basic one.
Each component must have it's own theme object.
It should have a specific structure (TBD).

![buttons](/packages/wix-ui-theme/assets/buttons.png)

## Why do we need this package
Since the whole idea is to provide a theme prop to the core component, one might wonder what the hell is this package needed for.

Why not simply do the following:

```javascript
import CoreButton from 'wix-ui-core/Button';

const theme = {
  color: 'green',
  backgroundColor: 'red',

  hover: {
    color: 'white',
    backgroundColor: 'black'
  }
};

export const ThemedButton = props =>
  <CoreButton theme={theme} {...props}>;
```

We won't get into too many implementation details, but what is going to happen in this case is that for each prop change there will be a lot of DOM interactions to keep the styles up to date.

## ThemedComponent
In order to boost the performance issue we faced in the previous example, this package exposes the `<ThemedComponent>` component which wrapps the core component and generates the styles from the theme object.

```javascript
import CoreButton from 'wix-ui-core/Button';
import {ThemedComponent} from 'wix-ui-theme';

const theme = {
  color: 'green',
  backgroundColor: 'red',

  hover: {
    color: 'white',
    backgroundColor: 'black'
  }
};

export const ThemedButton = ({theme, ...coreProps}) => (
  <ThemedComponent theme={theme}>
    <CoreButton {...coreProps}> 
  </ThemedComponent>
);
```

`theme`: Object or a function that returns an object.

`coreProps`: The props for the core component.

This will result in a new component which has it's own style.
The styles will be generated from the custom theme you need to write.

### Conditional Theme
The core component is implemented in [wix-ui-core](https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core), and the styles will be generated from the custom theme you need to write.

The theme is an object, or a fucnction that gets some optional additional props as arguments, and returns an object with a very specific structure. Each component has it's own theme structure.
For example:

```javascript
const theme = ({height, skin}) => ({
  fontSize: height === 'small' ? '14px' : '20px',
  color: skin === 'normal' ? 'white' : 'blue',
  backgroundColor: skin === 'normal' ? 'blue' : 'white',
  
  hover: {		
    color: 'blue',		
    backgroundColor: 'green'		
  }
});
```

Note that we usually wouldn't want to pass those additional props to the core component, although it is possible.
Those props are being used to generate the theme object which we will then pass to the Core component.

All of that is being taken care of by the `ThemedComponent` component which expects to get the core component as a `children` prop, a `theme` function / object prop, and some optional props which can be used by the theme function in order to generate the theme object.

Here is an example of how to implement a themed Button component properly:

```javascript
import CoreButton from 'wix-ui-core/Button';
import {ThemedComponent} from 'wix-ui-theme';

const theme = ({height, skin}) => ({
  fontSize: height === 'small' ? '14px' : '20px',
  color: skin === 'normal' ? 'white' : 'blue',
  backgroundColor: skin === 'normal' ? 'blue' : 'white',
  
  hover: {		
    color: 'blue',		
    backgroundColor: 'green'		
  }
});

export const Button = ({height, skin, ...coreProps}) => (
  <ThemedComponent theme={theme} height={height} skin={skin}>
    <CoreButton {...coreProps}/>
  </ThemedComponent>
);
```


