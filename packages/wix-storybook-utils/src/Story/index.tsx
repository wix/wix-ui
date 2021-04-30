import React from 'react';

import * as queryString from 'query-string';

import { StoryConfig } from '../typings/story-config';
import AutoExample from '../AutoExample';
import StoryPage from '../StoryPage';
import Remount from './RemountHoc';
import { isE2E, getComponentsHints } from '../utils';
import { scrollToElementByHash } from './utils';

declare global {
  namespace NodeJS {
    interface Global {
      self: any;
      top: any;
      autoexample: any;
    }
  }
}

scrollToElementByHash();

export default ({ _config, _metadata, ...storyConfig }) =>
  _config
    .storiesOf(storyConfig.category, module)
    .addParameters(storyConfig.parameters)
    .add(storyConfig.storyName || _metadata.displayName, () =>
      isE2E ? (
        <div>
          <Remount>
            <AutoExample
              isInteractive={false}
              ref={ref => (global.autoexample = ref)}
              component={storyConfig.component}
              componentWrapper={storyConfig.componentWrapper}
              componentProps={storyConfig.componentProps}
              parsedSource={_metadata}
            />
          </Remount>
          {queryString.parse(window.location.search).withExamples !==
            undefined && storyConfig.examples}
        </div>
      ) : (
        <StoryPage
          {...{
            ...({
              ...storyConfig,
              hints: getComponentsHints(_config.playgroundComponents),
            } as StoryConfig),
            metadata: _metadata,
            config: _config,
          }}
        />
      ),
    );
