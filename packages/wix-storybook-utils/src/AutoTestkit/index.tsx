import * as React from 'react';
import { DriverDocumentation } from './driver-documentation';

interface AutoTestkitProps {
  component: any;
}

export const AutoTestkit = ({ component }: AutoTestkitProps) => (
  <div className="markdown-body">
    <div>
      <h1 data-hook="auto-testkit-heading">{component.displayName} Testkits</h1>

      {component.drivers.map(({ file, descriptor, error }, i) => {
        if (error) {
          return <span />;
        }

        return (
          <div key={i} data-hook="auto-testkit-driver">
            <DriverDocumentation name={file} descriptor={descriptor} />
          </div>
        );
      })}
    </div>
  </div>
);
