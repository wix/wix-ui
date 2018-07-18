import React from 'react';
import PropTypes from 'prop-types';

import TextLink from 'wix-style-react/TextLink';

import TabbedView from '../TabbedView';
import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';
import AutoExample from '../AutoExample';
import AutoDocs from '../AutoDocs';
import omit from '../AutoExample/utils/omit';

import styles from './styles.scss';

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

const Section = ({title, children}) => (
  <div>
    <Markdown
      source={`## ${title}`}
      />
    {children}
  </div>
);
Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};

const StoryPage = ({
  metadata,
  config,
  component,
  componentProps,
  hiddenProps,
  displayName,
  exampleProps,
  exampleImport,
  examples,
  codeExample
}) => {
  const visibleDisplayName = displayName || metadata.displayName;
  const visibleMetadata = {
    ...metadata,
    displayName: visibleDisplayName,
    props: omit(metadata.props)(prop => hiddenProps.includes(prop))
  };

  return (
    <TabbedView tabs={tabs(metadata)}>
      <div className={styles.usage}>
        <Markdown
          dataHook="metadata-readme"
          source={metadata.readme || `# \`<${visibleDisplayName}/>\``}
          />

        { (displayName || metadata.displayName) &&
          <div className={styles.githubLink}>
            <TextLink
              link={`${config.repoBaseURL}${visibleDisplayName}`}
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
            metadata: visibleMetadata,
            exampleImport
          })}
          />

        <Section title="Playground">
          <AutoExample
            component={component}
            parsedSource={visibleMetadata}
            componentProps={componentProps}
            exampleProps={exampleProps}
            codeExample={codeExample}
            />
        </Section>

        { examples &&
          <Section title="Examples">
            {examples}
          </Section>
         }
      </div>

      <AutoDocs parsedSource={visibleMetadata}/>

      { metadata.readmeTestkit && <Markdown source={metadata.readmeTestkit}/> }

      { metadata.readmeAccessibility && <Markdown source={metadata.readmeAccessibility}/> }
    </TabbedView>
  );
};

StoryPage.propTypes = {
  metadata: PropTypes.object,
  config: PropTypes.shape({
    importFormat: PropTypes.string,
    moduleName: PropTypes.string,
    repoBaseURL: PropTypes.string
  }),
  component: PropTypes.any,
  componentProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  hiddenProps: PropTypes.array,
  displayName: PropTypes.string,
  exampleProps: PropTypes.object,

  /** custom string to be displayed in place of import example
   * usually something like `import Component from 'module/Component';`
   */
  exampleImport: PropTypes.string,
  examples: PropTypes.node,

  /** currently only `false` possible. later same property shall be used for configuring code example */
  codeExample: PropTypes.bool
};

StoryPage.defaultProps = {
  config: {
    importFormat: ''
  },
  hiddenProps: []
};

export default StoryPage;
