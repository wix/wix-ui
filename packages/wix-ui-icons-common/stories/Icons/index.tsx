import * as React from 'react';
import Markdown from 'wix-storybook-utils/Markdown';
import style from './icons.st.css';
import * as generalIcons from '../../src/general';
import * as systemIcons from '../../src/system';

const IconList = ({icons}) => (
  <div className={style.iconList}>
    {Object.keys(icons).map(iconName =>
      <div key={iconName} className={style.iconWithName}>
        {React.createElement(icons[iconName], {className: style.icon})}
        <div className={style.iconName}>{iconName}</div>
      </div>
    )}
  </div>
);

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

export class IconsStory extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <Markdown source={description} />
        <h2>General Icons</h2>
        <IconList icons={generalIcons} />
        <h2>System Icons</h2>
        <IconList icons={systemIcons} />
      </div>
    );
  }
}
