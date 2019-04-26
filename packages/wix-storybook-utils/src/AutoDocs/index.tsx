import React from 'react';

import { Metadata } from '../typings/metadata';
import { Prop } from '../typings/prop';

import { MethodsTable } from './methods-table';
import { PropsTable } from './props-table';

import styles from './styles.scss';

interface PropObject {
  [s: string]: Prop;
}

const splitDeprecated: (
  PropObject,
) => { deprecatedProps: PropObject; supportedProps: PropObject } = props =>
  Object.keys(props).reduce(
    (output, name) => {
      const prop = props[name];
      const isDeprecated = ((prop as Prop).tags || []).some(
        ({ title }) => title === 'deprecated',
      );

      if (isDeprecated) {
        output.deprecatedProps[name] = prop;
      } else {
        output.supportedProps[name] = prop;
      }

      return output;
    },

    { deprecatedProps: {}, supportedProps: {} },
  );

interface AutoDocsProps {
  metadata: Metadata;
}

const AutoDocs: React.SFC<AutoDocsProps> = ({ metadata }) => {
  const { props, methods = [] } = metadata;

  const publicMethods = methods.filter(({ name }) => !name.startsWith('_'));
  const { deprecatedProps, supportedProps } = splitDeprecated(props);

  const containsDeprecated = Object.keys(deprecatedProps).length > 0;

  return (
    <div className="markdown-body">
      <div className={styles.propsTable}>
        <div className={styles.tableTitle}>Props</div>

        <PropsTable props={supportedProps} />
      </div>

      {publicMethods.length > 0 && (
        <div className={styles.propsTable}>
          <div
            className={styles.tableTitle}
            data-hook="autodocs-methods-table-title"
          >
            Public methods
          </div>

          <MethodsTable methods={publicMethods} />
        </div>
      )}

      {containsDeprecated && (
        <div className={styles.propsTable}>
          <div className={styles.deprecatedTitle}>Deprecated Props</div>

          <div className={styles.deprecatedDescription}>
            The following properties were deprecated and will be removed in near
            future. Do not use them!
          </div>

          <PropsTable props={deprecatedProps} />
        </div>
      )}
    </div>
  );
};

export default AutoDocs;
