import React from 'react';
import PropTypes from 'prop-types';

import TextLink from 'wix-style-react/TextLink';

import TabbedView from '../TabbedView';
import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';
import AutoExample from '../AutoExample';
import AutoDocs from '../AutoDocs';

import styles from '../Story/styles.scss';

const tabs = metadata =>
  [
    'Usage',
    'API',
    ...(metadata.readmeTestkit ? ['Testkit'] : []),
    ...(metadata.readmeAccessibility ? ['Accessibility'] : [])
  ];

const importString = ({metadata, config, exampleImport}) =>
  [
    {
      when: () => exampleImport,
      make: () => exampleImport
    },
    {
      when: () => config.importFormat,
      make: () =>
        config.importFormat
          .replace(/%componentName/g, metadata.displayName)
          .replace(
            new RegExp('%(' + Object.keys(config).join('|') + ')', 'g'),
            (match, configKey) => config[configKey] || ''
          )
    },
    { // default
      when: () => true,
      make: () => `import ${metadata.displayName} from '${config.moduleName}/${metadata.displayName}';`
    }
  ].find(({when}) => when()).make();

const StoryPage = ({
  metadata,
  config,
  component,
  componentProps,
  exampleProps,
  exampleImport,
  examples
}) =>
  <TabbedView tabs={tabs(metadata)}>
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

      <CodeBlock
        dataHook="metadata-import"
        source={importString({
          config,
          metadata,
          exampleImport
        })}
        />

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
  </TabbedView>;

StoryPage.propTypes = {
  metadata: PropTypes.object,
  config: PropTypes.shape({
    importFormat: PropTypes.string,
    moduleName: PropTypes.string,
    repoBaseURL: PropTypes.string
  }),
  component: PropTypes.any,
  componentProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  exampleProps: PropTypes.object,

  /** custom string to be displayed in place of import example
   * usually something like `import Component from 'module/Component';`
   */
  exampleImport: PropTypes.string,
  examples: PropTypes.node
};

StoryPage.defaultProps = {
  config: {
    importFormat: ''
  }
};

export default StoryPage;
