import React from 'react';

import AutoExample from '../AutoExample';
import * as queryString from 'query-string';
import StoryPage from '../StoryPage';

const isE2E = global.self === global.top;

export default ({
  category,
  component,
  storyName,
  componentProps,
  examples,
  exampleProps,
  exampleImport,
  _config,
  _metadata
}) =>
  _config
    .storiesOf(category, module)
    .add(
      storyName || _metadata.displayName,
      () =>
        isE2E ?
          <div>
            <AutoExample
              isInteractive={false}
              ref={ref => global.autoexample = ref}
              component={component}
              componentProps={componentProps}
              parsedSource={_metadata}
              />

            {queryString.parse(window.location.search).withExamples !== undefined && examples}
          </div> :

          <StoryPage
            {...{
              component,
              componentProps,
              exampleProps,
              exampleImport,
              examples,
              metadata: _metadata,
              config: _config
            }}
            />
      );
