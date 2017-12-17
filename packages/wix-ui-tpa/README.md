# wix-ui-tpa

When writing a TPA application to be used in Wix websites, this package would allow you to use [wix-ui-core](https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core) components with ad-hoc wrapping layer which comunicates with the Wix sdk in order to react to each relevant change in the settings pannel.

If this is the first time you are writing a TPA application, you would most likely want to read this [doc](https://dev.wix.com/).

A full working TPA example which uses `wix-ui-tpa`: https://github.com/wix/wix-ui-tpa-example.

## Using the TpaStylesProvider

First thing we need to do is to wrap the application with the `TpaStylesProvider`. This provider receives the Wix sdk and subscribes event listeners for `STYLE_PARAMS_CHANGE` AND `THEME_CHANGE` events.
It means that each time one of these events occurs, the `TpaStylesProvider` will trigger a re-render with the updated site styles.

Moreover, the provider will pass to all the `wix-ui-tpa` components the site colors and fonts through the react context.

```javascript
import Wix from 'Wix';
import {TpaStylesProvider} from 'wix-ui-tpa';

const App = () => (
  <TpaStylesProvider wixSdk={Wix}>
    // The entire application goes here
  </TpaStylesProvider>
);
```

## Adding components to the application

Each component in `wix-ui-tpa` is an HOC that gets the `colors` and `fonts` of the site in addition to all the core component's props.

colors and sites are the values specified in the Wix sdk: `Wix.Styles.getStyleParams()`.

When you render a component within the `TpaStylesProvider`, you would have to pass one additional `wixBindings` object prop.
This prop is the dictionary that maps theme key to settings pannel key.

Let's see how to add a `Button` to the application.
Say we have the following simple settings pannel:

```javascript
import UI from 'editor-ui-lib';
import React from 'react';

export default class Settings extends React.Component {
  render() {
    return (
      <UI.appSettings>
        <UI.panelTabs defaultTabIndex={0}>
          <UI.colorPickerSlider
          title="Button background"
          wix-param="_btnBgColor"
          startWithColor="color-8"
          startWithOpacity={0.1}
          />

        <hr/>

        <UI.fontAndColorPicker
          title="Button font and color"
          wix-param-font="_btnFont"
          wix-param-color="_btnTextColor"
          startWithColor="color-1"
          startWithTheme="font_8"
          infoText="some information text should be here"
          />
        </UI.panelTabs>
      </UI.appSettings>
    );
  }
}
```

By looking at the [wix-ui-core docs] (TBD) we can see that Button's theme object contains `fonts`, `backgroundColor` and `color` properties.
We would like to bind between the settings pannel's `wix-param*` keys in order to update the theme object with respect to the `wix-param*` changes.

This is how we would do that:

```javascript
import Wix from 'Wix';
import {TpaStylesProvider} from 'wix-ui-tpa';
import Button from 'wix-ui-tpa/Button';

const buttonWixBindings = {
  fonts: '_btnFont',
  backgroundColor: '_btnBgColor',
  color: '_btnTextColor'
};

const App = () => (
  <TpaStylesProvider wixSdk={Wix}>
    <Button wixBindings={buttonWixBindings}>Hello</Button>
  </TpaStylesProvider>
);
```

Now each time the user will change the settings pannel's components, it will update the style of the components.
