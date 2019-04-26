import * as React from 'react';

import { StoryConfig } from '../../../typings/story-config';
import { Prop } from '../../../typings/prop';
import { Metadata } from '../../../typings/metadata';
import { ApiSection } from '../../../typings/story-section';

import styles from './styles.scss';

import AutoDocs from '../../../AutoDocs';

interface PropObject {
  [s: string]: Prop;
}

const splitDeprecated: (
  PropObject,
) => { deprecated: PropObject; supported: PropObject } = props =>
  Object.entries(props).reduce(
    (output, [name, prop]) => {
      const isDeprecated = ((prop as Prop).tags || []).some(
        ({ title }) => title === 'deprecated',
      );

      if (isDeprecated) {
        output.deprecated[name] = prop;
      } else {
        output.supported[name] = prop;
      }

      return output;
    },
    { deprecated: {}, supported: {} },
  );

export const api: (a: ApiSection, b: StoryConfig) => React.ReactNode = (
  section,
  storyConfig,
) => {
  const metadata =
    (section.parsedSource as Metadata) || (storyConfig.metadata as Metadata);
  const { deprecated, supported } = splitDeprecated(metadata.props);
  const containsDeprecated = Object.keys(deprecated).length > 0;

  return containsDeprecated ? (
    <div>
      <AutoDocs parsedSource={{ ...metadata, props: supported }} />

      <div>
        <div className={styles.deprecatedTitle}>Deprecated Props</div>

        <div className={styles.deprecatedDescription}>
          The following properties were deprecated and will be removed in near
          future. Avoid using them!
        </div>
      </div>

      <AutoDocs
        showMethods={false}
        showTitle={false}
        parsedSource={{ ...metadata, props: deprecated }}
      />
    </div>
  ) : (
    <AutoDocs parsedSource={metadata} />
  );
};
