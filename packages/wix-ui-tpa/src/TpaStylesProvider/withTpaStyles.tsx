import * as React from 'react';
import {object} from 'prop-types';

interface Context {
  colors: object;
  fonts: object;
}

type ThemeWrapperComponent = React.SFC<any> & {contextTypes?: Context};

export const withTpaStyles = Component => {
  const ThemeWrapper: ThemeWrapperComponent = (props, {colors, fonts}) => {
    if (!colors || !fonts) {
      throw new Error(`Error: wix-ui-tpa components must be wrapped by TpaStylesProvider`);
    }

    return <Component {...{...props, colors, fonts}}/>;
  };

  ThemeWrapper.contextTypes = {
    colors: object,
    fonts: object
  };
  return ThemeWrapper;
};
