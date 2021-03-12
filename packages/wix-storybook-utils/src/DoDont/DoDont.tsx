import * as React from 'react';
import classnames from 'classnames';

import { StatusCompleteFilledSmall, DismissSmall } from 'wix-ui-icons-common';
import styles from './styles.scss';

export type DoDontProps = {
  do: { title: string; list: String[] };
  dont: { title: string; list: String[] };
};

const DismisIcon = () => (
  <div className={styles.dismissContainer}>
    <DismissSmall className={styles.dismissIcon} />
  </div>
);

const CompleteIcon = () => (
  <div className={styles.completeIcon}>
    <StatusCompleteFilledSmall />
  </div>
);

const List: React.FC<{
  list: DoDontProps['do']['list'];
  skin: 'red' | 'green';
}> = props => (
  <div className={styles.list}>
    {props.list.map((item, id) => (
      <div key={id} className={styles.listItem}>
        {props.skin === 'red' ? <DismisIcon /> : <CompleteIcon />}
        <div>{item}</div>
      </div>
    ))}
  </div>
);

const Title: React.FC<{
  title: DoDontProps['do']['title'];
  skin?: 'red' | 'green';
}> = props => (
  <div
    className={classnames(styles.title, {
      [styles.red]: props.skin === 'red',
      [styles.green]: props.skin === 'green',
    })}
  >
    {props.title
      ? props.title
      : props.skin === 'red'
      ? `Dont't use it`
      : 'Use it'}
  </div>
);

export const DoDont = (props: DoDontProps) => (
  <div className={styles.root}>
    {props.do && (
      <div className={classnames(styles.block, styles.blockDo)}>
        <Title title={props.do.title} skin="green" />
        <List list={props.do.list} skin="green" />
      </div>
    )}
    {props.dont && (
      <div className={classnames(styles.block, styles.blockDont)}>
        <Title title={props.dont.title} skin="red" />
        <List list={props.dont.list} skin="red" />
      </div>
    )}
  </div>
);
