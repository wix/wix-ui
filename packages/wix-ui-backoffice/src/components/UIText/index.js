import React from 'react';
import {oneOf, bool} from 'prop-types';
import CoreText from 'wix-ui-core/Text';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const UIText = ({forceHideTitle, ellipsis, children, appearance, tagName}) => {
  return (
    <ThemedComponent theme={theme} appearance={appearance}>
      <CoreText forceHideTitle={forceHideTitle} ellipsis={ellipsis} tagName={tagName} dataClass="uitext">
        {children}
      </CoreText>
    </ThemedComponent>
  );
};

UIText.propTypes = {
  ...CoreText.propTypes,
  appearance: oneOf([
    'T1', 'T1.1', 'T1.2', 'T1.3', 'T1.4',
    'T2', 'T2.1', 'T2.2', 'T2.3',
    'T3', 'T3.1', 'T3.2', 'T3.3', 'T3.4',
    'T4', 'T4.1', 'T4.2', 'T4.3',
    'T5', 'T5.1']),
  ellipsis: bool,
  forceHideTitle: bool,
  tagName: oneOf(['div', 'span'])
};

UIText.defaultProps = {
  /** typography of the text */
  appearance: 'T1.1',

  /** show ellipsis if needed */
  ellipsis: false,

  /** hide title tooltip if ellipsis is enabled */
  forceHideTitle: false,

  /** the tag name to be used (default span) */
  tagName: 'span'
};

export default UIText;
