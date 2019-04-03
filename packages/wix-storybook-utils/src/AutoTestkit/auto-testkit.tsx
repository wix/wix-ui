import * as React from 'react';
import { DriverDocumentation } from './driver-documentation';
import { CodeExample } from './code-example';
import UnidriverTestkit from './unidriver';

const getDriverNames = descriptor => {
  const drivers = descriptor.filter(d => d.type === 'object');
  if (drivers.length) {
    return drivers.map(({ name }) => name);
  }

  return [(descriptor.file || '').split('.')[0]];
};

interface AutoTestkitProps {
  component: any;
  unidriver?: boolean;
}

export const AutoTestkit = ({ component, unidriver }: AutoTestkitProps) => (
  <div className="markdown-body">
    {unidriver ? (
      <UnidriverTestkit component={component} />
    ) : (
      <Testkit component={component} />
    )}
  </div>
);

const Testkit = ({ component }) => (
  <div>
    <h1 data-hook="auto-testkit-heading">{component.displayName} Testkits</h1>
    {component.drivers.map(({ file, descriptor, error }, i) => {
      if (error) {
        return <span />;
      }
      const driverNames = getDriverNames(descriptor);

      return (
        <div key={i} data-hook="auto-testkit-driver">
          <DriverDocumentation name={file} descriptor={descriptor} />
          <h3>
            Code example
            {driverNames.length > 1 ? 's' : ''}
          </h3>
          {driverNames.map((name, index) => (
            <CodeExample
              key={index}
              driverName={name}
              driverFilename={file}
              componentName={component.displayName}
            />
          ))}
        </div>
      );
    })}
  </div>
);
