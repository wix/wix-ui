import * as React from 'react';
import classnames from 'classnames';

import { StatusCompleteFilledSmall, DismissSmall } from 'wix-ui-icons-common';
import { DoDontProps } from './DoDont.types';

import styles from './styles.scss';

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
      ? `Don't`
      : `Do`}
  </div>
);

export const DoDont = (props: DoDontProps) => (
  <div className={styles.root}>
    {props.do && (
      <div
        data-hook="dodont-do"
        className={classnames(styles.block, styles.blockDo, {
          [styles.blockFull]: !props.do || !props.dont,
        })}
      >
        <Title title={props.do.title} skin="green" />
        <List list={props.do.list} skin="green" />
      </div>
    )}
    {props.dont && (
      <div
        data-hook="dodont-dont"
        className={classnames(styles.block, styles.blockDont, {
          [styles.blockFull]: !props.do || !props.dont,
        })}
      >
        <Title title={props.dont.title} skin="red" />
        <List list={props.dont.list} skin="red" />
      </div>
    )}
  </div>
);
