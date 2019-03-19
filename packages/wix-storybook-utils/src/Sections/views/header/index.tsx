import * as React from 'react';
import Promote from 'wix-ui-icons-common/Promote';
import Code from 'wix-ui-icons-common/Code';

import { HeaderSection } from '../../../typings/story-section';
import { StoryConfig } from '../../../typings/story-config';

import { Layout, Cell } from '../../../ui/Layout';
import styles from './styles.scss';

const issueUrlRules = [
  { when: ({ issueUrl }) => issueUrl, make: ({ issueUrl }) => issueUrl },
  {
    when: (_, { config: { repoBaseURL } }) => repoBaseURL,
    make: (_, { config: { repoBaseURL } }) => `${repoBaseURL}/issues`,
  },
];

const sourceUrlRules = [
  { when: ({ sourceUrl }) => sourceUrl, make: ({ sourceUrl }) => sourceUrl },
  {
    when: (_, { metadata: { displayName }, config: { repoBaseURL } }) =>
      repoBaseURL && displayName,
    make: (_, { metadata: { displayName }, config: { repoBaseURL } }) =>
      `${repoBaseURL}/tree/master/src/${displayName}`,
  },
];

const deriveConfig = (section: HeaderSection, config: StoryConfig) => rules => {
  const rule = rules.find(({ when }) => when(section, config) as boolean);
  return rule ? rule.make(section, config) : undefined;
};

export const header: (a: HeaderSection, b: StoryConfig) => React.ReactNode = (
  section,
  storyConfig,
) => {
  const { title, component } = section;
  const derive = deriveConfig(section, storyConfig);
  const issueUrl = derive(issueUrlRules);
  const sourceUrl = derive(sourceUrlRules);

  return (
    <div className={styles.root}>
      <Layout className={styles.titleLayout}>
        <Cell span={6} className={styles.title}>
          {title || storyConfig.storyName}
        </Cell>

        <Cell span={6} className={styles.links} data-hook>
          {issueUrl && (
            <div className={styles.link} data-hook="section-header-issueUrl">
              <Promote size="24px" /> <a href={issueUrl}>Report an issue</a>
            </div>
          )}

          {sourceUrl && (
            <div className={styles.link} data-hook="section-header-sourceUrl">
              <Code size="24px" /> <a href={sourceUrl}>Source</a>
            </div>
          )}
        </Cell>
      </Layout>

      {component && (
        <div className={styles.componentWrapper}>
          <div className={styles.component}>{component}</div>
        </div>
      )}
    </div>
  );
};
