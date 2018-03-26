import React from 'react';
import TextLink from 'wix-style-react/TextLink';

import TabbedView from '../TabbedView';
import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';
import AutoExample from '../AutoExample';
import AutoDocs from '../AutoDocs';
import * as queryString from 'query-string';
import styles from '../Story/styles.scss';

const isE2E = global.self === global.top;

export default ({
  category,
  component,
  storyName,
  componentProps,
  examples,
  exampleProps,
  _config,
  _metadata
}) =>
  _config.storiesOf(category, module).add(storyName || _metadata.displayName, () => {
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
    }

    const tabs = [
      'Usage',
      'API',
      ...(_metadata.readmeTestkit ? ['Testkit'] : []),
      ...(_metadata.readmeAccessibility ? ['Accessibility'] : [])
    ];

    return (
      <TabbedView tabs={tabs}>
        <div className={styles.usage}>
          {_metadata.readme ?
            <Markdown source={_metadata.readme}/> :
            <Markdown source={`# \`<${_metadata.displayName}/>\``}/>
          }

          {_metadata.displayName &&
            <div className={styles.githubLink}>
              <TextLink
                link={`${_config.repoBaseURL}${_metadata.displayName}`}
                target="_blank"
                >
                View source
              </TextLink>
            </div>
          }

          {_metadata.displayName && <CodeBlock source={`import ${_metadata.displayName} from '${_config.moduleName}/${_metadata.displayName}';`}/>}

          <AutoExample
            component={component}
            parsedSource={_metadata}
            componentProps={componentProps}
            exampleProps={exampleProps}
            />

          {examples}
        </div>

        <AutoDocs parsedSource={_metadata}/>

        { _metadata.readmeTestkit && <Markdown source={_metadata.readmeTestkit}/> }

        { _metadata.readmeAccessibility && <Markdown source={_metadata.readmeAccessibility}/> }
      </TabbedView>
    );
  });
