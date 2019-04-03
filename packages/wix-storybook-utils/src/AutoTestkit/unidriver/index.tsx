import * as React from 'react';
import { API } from './components/api-table';
import { CodeExample } from './components/code-example';

const driverNames = ['react', 'enzyme', 'puppeteer', 'protractor'];

export const UnidriverTestkit = ({ component }) => (
  <div>
    {component.drivers.map(({ file, descriptor, error }, i) => {
      if (error) {
        return null;
      }
      return (
        <div key={i}>
          <API name={file} descriptor={descriptor} />
          {driverNames.map((name, index) => (
            <CodeExample
              key={index}
              driverName={name}
              componentName={component.displayName}
            />
          ))}
        </div>
      );
    })}
  </div>
);

export default UnidriverTestkit;
