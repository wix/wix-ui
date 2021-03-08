import React from 'react';

import { Method } from '../typings/metadata';
import { Prop } from '../typings/prop';

import { MethodsTable } from './methods-table';
import { PropsTable } from './props-table';
import SectionHelper from '../SectionHelper';

import { AutoDocsProps } from './index.types';

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

const Table = ({
  properties,
  publicMethods,
  title,
  deprecated,
  dataHook,
}: {
  title: string;
  properties?: Record<string, Prop>;
  publicMethods?: Method[];
  deprecated?: boolean;
  dataHook?: string;
}) => {
  return (
    <div className={styles.table}>
      <div className={styles.title} data-hook={dataHook}>
        {title}
      </div>
      {deprecated && (
        <SectionHelper>
          The following properties were deprecated and will be removed in near
          future. Do not use them!
        </SectionHelper>
      )}
      {publicMethods && <MethodsTable methods={publicMethods} />}
      {properties && <PropsTable props={properties} />}
    </div>
  );
};

const AutoDocs: React.FunctionComponent<AutoDocsProps> = ({ metadata }) => {
  const { props, methods = [] } = metadata;

  const publicMethods = methods.filter(({ name }) => !name.startsWith('_'));
  const { deprecatedProps, supportedProps } = splitDeprecated(props);

  const containsDeprecated = Object.keys(deprecatedProps).length > 0;
  const containsPublicMethods = publicMethods.length > 0;

  return (
    <div className="markdown-body">
      <Table properties={supportedProps} title="Properties" />
      {containsPublicMethods && (
        <Table
          dataHook="autodocs-methods-table-title"
          title="Public methods"
          publicMethods={publicMethods}
        />
      )}
      {containsDeprecated && (
        <Table
          properties={deprecatedProps}
          title="Deprecated Props"
          deprecated
        />
      )}
    </div>
  );
};

export default AutoDocs;
