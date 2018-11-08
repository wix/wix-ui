import React from 'react';

import AutoExample from '../AutoExample';
import * as queryString from 'query-string';
import StoryPage from '../StoryPage';
import Remount from './RemountHoc';

const isE2E = global.self === global.top;

export default ({
  category,
  component,
  storyName,
  displayName,
  componentProps,
  componentWrapper,
  examples,
  exampleProps,
  exampleImport,
  codeExample,
  hiddenProps,
  _config,
  _metadata,
}) =>
  _config
    .storiesOf(category, module)
    .add(storyName || _metadata.displayName, () =>
      isE2E ? (
        <div>
          <Remount>
            <AutoExample
              isInteractive={false}
              ref={ref => (global.autoexample = ref)}
              component={component}
              componentProps={componentProps}
              parsedSource={_metadata}
            />
          </Remount>
          {queryString.parse(window.location.search).withExamples !==
            undefined && examples}
        </div>
      ) : (
        <StoryPage
          {...{
            component,
            componentProps,
            componentWrapper,
            exampleProps,
            exampleImport,
            displayName,
            examples,
            codeExample,
            hiddenProps,
            metadata: _metadata,
            config: _config,
          }}
        />
      ),
    );
