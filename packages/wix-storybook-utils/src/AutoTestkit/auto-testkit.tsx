import * as React from 'react';
import { DriverDocumentation } from './driver-documentation';

export const AutoTestkit = ({ component }) => (
  <div className="markdown-body">
    <h1 data-hook="auto-testkit-heading">{component.displayName} Testkits</h1>
    {component.drivers.map(({ file, descriptor }, i) => {
      return (
        <div key={i} data-hook="auto-testkit-driver">
          <DriverDocumentation name={file} descriptor={descriptor} />
        </div>
      );
    })}
  </div>
);
