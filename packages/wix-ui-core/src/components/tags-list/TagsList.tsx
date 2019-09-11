import * as React from 'react';

import { DataHook } from './TagsList.helpers';
import style from './TagsList.st.css';

interface Props {
  className?: string;
}

export interface TagsListProps extends Props {}

export interface TagProps extends Props {
  onChange?(e: React.FormEvent<HTMLLabelElement>): void;
  checked?: boolean;
  value: string;
}

export const Tag: React.FunctionComponent<TagProps> = ({
  children,
  className,
  onChange,
  checked,
  value,
}) => {
  const nameOfClass = className
    ? `${style.tagListItem} ${className}`
    : style.tagListItem;

  return (
    <label data-hook={DataHook.Tag} className={nameOfClass} onChange={onChange}>
      <input
        data-hook={DataHook.TagInput}
        className={style.tagInput}
        type="checkbox"
        checked={checked}
        value={value}
      />
      {children}
    </label>
  );
};

Tag.displayName = 'Tag';

export const TagsList: React.FunctionComponent<TagsListProps> = ({
  children,
  className,
}) => {
  return (
    <div className={className} {...style('root')}>
      <div data-hook={DataHook.TagsList} className={style.tagsList}>
        {children}
      </div>
    </div>
  );
};

TagsList.displayName = 'TagsList';
