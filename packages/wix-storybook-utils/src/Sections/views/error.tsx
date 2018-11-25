import * as React from 'react';

import { ErrorSection } from '../../typings/story-section';

export const error: ((a: ErrorSection) => React.ReactNode) = section => (
  <div>
    Invalid section :(
    <br />
    The following configuration is not supported:
    <pre>{JSON.stringify(section, null, 2)}</pre>
  </div>
);
