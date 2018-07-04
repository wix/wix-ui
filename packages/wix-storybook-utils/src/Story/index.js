import React from 'react';

import AutoExample from '../AutoExample';
import * as queryString from 'query-string';
import StoryPage from '../StoryPage';

const isE2E = global.self === global.top;

export default ({
  category,
  component,
  storyName,
  displayName,
  componentProps,
  examples,
  exampleProps,
  exampleImport,
  codeExample,
  renderStory,
  _config,
  _metadata
}) =>
  _config
    .storiesOf(category, module)
    .add(
      storyName || _metadata.displayName,
      () => {
        const manualStory = renderStory({
          isTestMode: isE2E,
          component,
          displayName,
          componentProps,
          examples,
          exampleProps,
          exampleImport,
          codeExample,
          _config,
          _metadata
        });
        if (manualStory) {
          return manualStory;
        }
        if (isE2E) {
          return (
            <div>
              <AutoExample
                isInteractive={false}
                ref={ref => global.autoexample = ref}
                component={component}
                componentProps={componentProps}
                parsedSource={_metadata}
                />

              {queryString.parse(window.location.search).withExamples !== undefined && examples}
            </div>
          );
        } else {
          return (
            <StoryPage
              {...{
                component,
                componentProps,
                exampleProps,
                exampleImport,
                displayName,
                examples,
                codeExample,
                metadata: _metadata,
                config: _config
              }}
              />
          );
        }
      }
      );
