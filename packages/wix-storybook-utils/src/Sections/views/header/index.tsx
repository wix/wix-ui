import * as React from 'react';
import Promote from 'wix-ui-icons-common/Promote';
import Code from 'wix-ui-icons-common/Code';

import { HeaderSection } from '../../../typings/story-section';
import { StoryConfig } from '../../../typings/story-config';

import { Layout, Cell } from '../../../ui/Layout';
import styles from './styles.scss';

export const header: (a: HeaderSection, b: StoryConfig) => React.ReactNode = (
  section,
  storyConfig,
) => {
  const { title, component, sourceUrl, issueUrl } = section;
  const issueURL = storyConfig.config.issueURL || issueUrl;

  return (
    <div className={styles.root}>
      <Layout className={styles.titleLayout}>
        <Cell span={6} className={styles.title}>
          {title || storyConfig.storyName}
        </Cell>

        <Cell span={6} className={styles.links} data-hook>
          {issueURL && (
            <div className={styles.link} data-hook="section-header-issueUrl">
              <Promote size="24px" /> <a href={issueURL}>Report an issue</a>
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
