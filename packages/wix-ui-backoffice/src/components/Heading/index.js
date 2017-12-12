import React from 'react';
import {oneOf} from 'prop-types';
import CoreText from 'wix-ui-core/Text';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const Heading = ({children, appearance, skin}) => {
  return (
    <ThemedComponent theme={theme} appearance={appearance} skin={skin}>
      <CoreText forceHideTitle ellipsis={false} tagName={getType(appearance)}>
        {children}
      </CoreText>
    </ThemedComponent>
  );
};

Heading.propTypes = {
  skin: oneOf(['dark', 'light']),
  appearance: oneOf(['H0', 'H1', 'H2', 'H3'])
};

Heading.defaultProps = {
  appearance: 'H0',
  skin: 'dark'
};

function getType(appearance) {
  return [
    {type: 'h1', candidates: ['H0']},
    {type: 'h2', candidates: ['H1']},
    {type: 'h3', candidates: ['H2']},
    {type: 'h4', candidates: ['H3']}
  ]
    .filter(({candidates}) => candidates.indexOf(appearance) !== -1)
    .reduceRight((acc, {type}) => type, 'span');
}

export default Heading;
