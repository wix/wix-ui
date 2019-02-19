import * as React from 'react';
import { HeaderSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import Promote from 'wix-ui-icons-common/Promote';
import Code from 'wix-ui-icons-common/Code';

const { Layout, Cell } = require('../../ui/Layout');
const styles = require('./styles.scss');

export const header: (a: HeaderSection, b: StoryConfig) => React.ReactNode = ({
  title,
  component,
  issueUrl,
  sourceUrl
}, storyConfig) => (
    <div className={styles.header}>
      <Layout className={styles.headerLayout}>
        <Cell span={6} className={styles.title}>
          <div className={styles.title}>{title || storyConfig.storyName}</div>
        </Cell>
        <Cell span={6} className={styles.links}>
          {issueUrl && <div className={styles.link}>
            <Promote size="24px" /> <a href={issueUrl}>Report an issue</a>
          </div>}
          {sourceUrl && <div className={styles.link}>
            <Code size="24px" /> <a href={sourceUrl}>Source</a>
          </div>}
        </Cell>
      </Layout>
      {
        <div className={styles.component}>
          {component}
        </div>
      }
    </div>
  );
