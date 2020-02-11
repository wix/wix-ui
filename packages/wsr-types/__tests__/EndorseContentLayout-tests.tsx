import * as React from 'react';
import EndorseContentLayout from 'wix-style-react/EndorseContentLayout';

function EndorseContentLayoutWithMandatoryProps() {
  return <EndorseContentLayout />;
}

function EndorseContentLayoutWithAllProps() {
  return (
    <EndorseContentLayout
      content={<div />}
      head={<div />}
      primaryCta={<div />}
      secondaryCta={<div />}
    />
  );
}
