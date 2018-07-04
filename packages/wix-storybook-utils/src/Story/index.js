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
  _config,
  _metadata
}) =>
  _config
    .storiesOf(category, module)
    .add(
      storyName || _metadata.displayName,
      () => {
        if (isE2E) {
          const exampleIndex = queryString.parse(window.location.search).exampleIndex;
          const withExamples = queryString.parse(window.location.search).withExamples !== undefined || exampleIndex !== undefined;
          const shouldDisplayAutoExample = exampleIndex === undefined;

          const renderExamples = () => {
            if (exampleIndex === undefined) {
              return examples;
            }

            if (!Array.isArray(examples)) {
              throw new Error(`Story E2E: exampleIndex=${exampleIndex} but examples is not an Array`);
            }
            return examples[Number(exampleIndex)];
          };

          return (
            <div>
              { shouldDisplayAutoExample &&
                <AutoExample
                  isInteractive={false}
                  ref={ref => global.autoexample = ref}
                  component={component}
                  componentProps={componentProps}
                  parsedSource={_metadata}
                  />
              }
              {withExamples && renderExamples()}
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
