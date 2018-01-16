import React from 'react';
import TextLink from 'wix-style-react/TextLink';

import TabbedView from '../TabbedView';
import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';
import AutoExample from '../AutoExample';
import AutoDocs from '../AutoDocs';

import styles from '../Story/styles.scss';


export default ({
  category,
  component,
  storyName,
  componentProps,
  examples,
  exampleProps,
  _config: config,
  _metadata: metadata
}) =>
  config.storiesOf(category, module).add(storyName || metadata.displayName, () => {
    const tabs = [
      'Usage',
      'API',
      ...(metadata.readmeTestkit ? ['Testkit'] : []),
      ...(metadata.readmeAccessibility ? ['Accessibility'] : [])
    ];

    return (
      <TabbedView tabs={tabs}>
        <div className={styles.usage}>
          {metadata.readme ?
            <Markdown source={metadata.readme}/> :
            <Markdown source={`# \`<${metadata.displayName}/>\``}/>
          }

          {metadata.displayName &&
            <div className={styles.githubLink}>
              <TextLink
                link={`${config.repoBaseURL}${metadata.displayName}`}
                target="_blank"
                >
                View source
              </TextLink>
            </div>
          }

          {metadata.displayName && <CodeBlock source={`import ${metadata.displayName} from '${config.moduleName}/${metadata.displayName}';`}/>}

          <AutoExample
            component={component}
            parsedSource={metadata}
            componentProps={componentProps}
            exampleProps={exampleProps}
            />

          {examples}
        </div>

        <AutoDocs parsedSource={metadata}/>

        { metadata.readmeTestkit && <Markdown source={metadata.readmeTestkit}/> }

        {metadata.readmeAccessibility && <Markdown source={metadata.readmeAccessibility}/>}
      </TabbedView>
    );
  });
