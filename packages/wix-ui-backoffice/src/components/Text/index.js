import React from 'react';
import {oneOf, bool} from 'prop-types';
import CoreText from 'wix-ui-core/Text';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const Text = coreProps => {
  const {forceHideTitle, ellipsis, children, appearance} = coreProps;
  return (
    <ThemedComponent theme={theme} appearance={appearance}>
      <CoreText forceHideTitle={forceHideTitle} ellipsis={ellipsis} tagName={getType(appearance)}>
        {children}
      </CoreText>
    </ThemedComponent>
  );
};

Text.propTypes = {
  ...CoreText.propTypes,
  appearance: oneOf([
    'H0', 'H1', 'H1.1', 'H2', 'H2.1', 'H3', 'H4',
    'T1', 'T1.1', 'T1.2', 'T1.3', 'T1.4',
    'T2', 'T2.1', 'T2.2', 'T2.3',
    'T3', 'T3.1', 'T3.2', 'T3.3', 'T3.4',
    'T4', 'T4.1', 'T4.2', 'T4.3',
    'T5', 'T5.1']),
  ellipsis: bool,
  forceHideTitle: bool
};

Text.defaultProps = {
  appearance: 'T1.1',
  ellipsis: true,
  forceHideTitle: false
};

function getType(appearance) {
  return [
    {type: 'h1', candidates: ['H0']},
    {type: 'h2', candidates: ['H1', 'H1.1']},
    {type: 'h3', candidates: ['H2', 'H2.1']},
    {type: 'h4', candidates: ['H3']},
    {type: 'h5', candidates: ['H4']}
  ]
    .filter(({candidates}) => candidates.indexOf(appearance) !== -1)
    .reduceRight((acc, {type}) => type, 'span');
}

export default Text;
