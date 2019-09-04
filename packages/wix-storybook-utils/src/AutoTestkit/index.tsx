import * as React from 'react';

import { DriverDocumentation } from './driver-documentation';
import { Metadata } from '../typings/metadata';

interface Props {
  metadata: Metadata;
}

export const AutoTestkit = ({ metadata }: Props) => (
  <div className="markdown-body">
    <h1 data-hook="auto-testkit-heading">{metadata.displayName} Testkits</h1>

    {metadata.drivers
      .filter(({ error }) => !error)
      .map(({ file, descriptor, error }, i) => (
        <div key={i} data-hook="auto-testkit-driver">
          <DriverDocumentation name={file} descriptor={descriptor} />
        </div>
      ))}
  </div>
);
