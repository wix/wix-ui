import * as React from 'react';
import Markdown from 'wix-storybook-utils/Markdown';
import style from './icons.st.css';
import * as generalIcons from '../../src/general';
import * as systemIcons from '../../src/system';

export const ICON_TYPES = {
  GENERAL: 'General',
  SYSTEM: 'System'
};

export const ICON_SIZES = {
  SMALL: 'Small',
  NORMAL: 'Normal',
  MEDIUM: 'Medium',
  LARGE: 'Large'
};

const IconList = ({icons}) => (
  <div data-hook="icons-list" className={style.iconList}>
    {Object.keys(icons).map(iconName =>
      <div key={iconName} className={style.iconWithName}>
        {React.createElement(icons[iconName], {className: style.icon})}
        <div className={style.iconName}>{iconName}</div>
      </div>
    )}
  </div>
);

const endsWith = (str, suffix) => str.indexOf(suffix, str.length - suffix.length) !== -1;

const getIconsInSizeNormal = (icons) => {
  const filteredIcons = {};
  Object.keys(icons)
    .filter(iconName => !endsWith(iconName, ICON_SIZES.SMALL))
    .filter(iconName => !endsWith(iconName, ICON_SIZES.MEDIUM))
    .filter(iconName => !endsWith(iconName, ICON_SIZES.LARGE))
    .forEach(iconName => filteredIcons[iconName] = icons[iconName]);
  return filteredIcons;
};

const getIconsNotInSizeNormal = (icons, size) => {
  const filteredIcons = {};
  Object.keys(icons)
    .filter(iconName => endsWith(iconName, size))
    .forEach(iconName => filteredIcons[iconName] = icons[iconName]);
  return filteredIcons;
}

const getIconsBySize = (icons, size) =>
  size === ICON_SIZES.NORMAL ? getIconsInSizeNormal(icons) : getIconsNotInSizeNormal(icons, size);

const description = `
## Usage
~~~js
import Favorite from 'wix-ui-icons-common/Favorite';  // General icon
import Close from 'wix-ui-icons-common/system/Close'; // System icon

<Favorite size="3em" className="fav" />;
~~~

## Properties
<table>
  <tr><th>name <th>type   <th>default value <th>required <th>description</tr>
  <tr><td>size <td>string <td>1em           <td>no       <td>Size of the icon</tr>
  <tr><td colspan="5">All other props are passed to the SVG element</td></tr>
</table>
`;

export interface Props {
  size: string;
  type: string;
}

export class IconsStory extends React.Component<Props, {}> {
  render() {
    const {type, size} = this.props;
    return (
      <div className={style.root}>
        <Markdown source={description} />
        <h2>{type} Icons - {size}</h2>
        <IconList icons={getIconsBySize(type === ICON_TYPES.GENERAL ? generalIcons : systemIcons, size)} />
      </div>
    );
  }
}
