import * as React from 'react';
import Promote from '../../../icons/Promote';
import Code from '../../../icons/Code';

import { HeaderSection } from '../../../typings/story-section';
import { StoryConfig } from '../../../typings/story-config';

import { Layout, Cell } from '../../../ui/Layout';
import styles from './styles.scss';

export const header: (a: HeaderSection, b: StoryConfig) => React.ReactNode = (
  section,
  storyConfig,
) => {
  const { title, component, sourceUrl, issueUrl } = section;
  const issueURL = storyConfig.config?.issueURL || issueUrl;

  const headerTitle = storyConfig.storyName || (title && title.toString());

  window.sessionStorage.setItem('storybook-page-title', headerTitle);

  return (
    <div className={styles.rootWrapper}>
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

        {component && <div className={styles.component}>{component}</div>}
      </div>
    </div>
  );
};
