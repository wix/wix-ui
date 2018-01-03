import React from 'react';
import * as Icons from 'wix-ui-icons';
import s from './style.scss';

const renderIcon = name => {
  return (
    <div className={s.singleIconView} key={name}>
      <span>{React.createElement(Icons[name])}</span>
      <span className={s.iconName}>{name}</span>
    </div>
  );
};

export default () => {
  return (<div className={s.iconList}>
    {Object.keys(Icons).map(renderIcon)}
  </div>);
};
