import React from 'react';
import PropTypes from 'prop-types';

import TextLink from 'wix-style-react/TextLink';

import TabbedView from '../TabbedView';
import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';
import AutoExample from '../AutoExample';
import AutoDocs from '../AutoDocs';

import styles from '../Story/styles.scss';

const StoryPage = ({
  metadata,
  config,
  component,
  componentProps,
  exampleProps,
  examples
}) => {
  const tabs = [
    'Usage',
    'API',
    ...(metadata.readmeTestkit ? ['Testkit'] : []),
    ...(metadata.readmeAccessibility ? ['Accessibility'] : [])
  ];

  return (
    <TabbedView tabs={tabs}>
      <div className={styles.usage}>
        <Markdown
          dataHook="metadata-readme"
          source={metadata.readme || `# \`<${metadata.displayName}/>\``}
          />

        {metadata.displayName &&
          <div className={styles.githubLink}>
            <TextLink
              link={`${config.repoBaseURL}${metadata.displayName}`}
              target="blank"
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

      { metadata.readmeAccessibility && <Markdown source={metadata.readmeAccessibility}/> }
    </TabbedView>
  );
};

StoryPage.propTypes = {
  metadata: PropTypes.object,
  config: PropTypes.object,
  component: PropTypes.any,
  componentProps: PropTypes.object,
  exampleProps: PropTypes.object,
  examples: PropTypes.node
};

export default StoryPage;
