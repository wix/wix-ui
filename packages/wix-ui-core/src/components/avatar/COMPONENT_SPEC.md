# Avatar

Avatar is a type of element that visually represents a user, either as an image, icon or initials.
<br><br>
![image](./readme-assets/avatar-types.png)
## Elements

Elements are "container" and content, which could be classified to either "text", "image" or "icon"

## API

#### Component Props

| name      | type                             | defaultValue | isRequired | description                                                            |
|:----------|:---------------------------------|:-------------|:-----------|:-----------------------------------------------------------------------|
| name      | string                           |              |            | The name of the avatar user. Initials will be generated from the name  |
| imgProps  | Omit<HTMLImageAttributes, 'alt'> |              |            | the source url to load image from                                      |
| icon      | JSX Element                      |              |            | an SVG icon component                                                  |
| text      | string                      |              |            | raw text to display as content                                                  |
| tabIndex  | number                           | 0            |            | the `tabIndex` value to put on the root                                |
| title     | string                           | 0            |            | the `title` attribute to put on the root. Defaults to `name` prop      |
| ariaLabel | string                           | 0            |            | the `aria-label` attribute to put on the root. Defaults to `name` prop |


## General Behavior

this component will display content based on the props provided:
* If `imgProps` is provided (and successfully loaded), it will display an image as content with the provided properties.
* If an element is provided in `icon` it will display it.
* If `text` is provided it will display the string.
* If none of the above props is provided, the component will convert `name` to initials and display that.

Alternative content:<br>
If image fails to load, the component will display either `icon` or `text` or `name` initials, in that order.
This alternative will also be shown while image in loading state.

name conversion examples:
<br/> John Doe --> JD
<br/> John H. Doe --> JHD
<br/> John Hurley Stanley Kubrik Doe --> JHD
<br/> john doe --> JD

## Technical Considerations

The `alt` property is omitted from `imgProps` interface. `name` prop will be used as `alt` instead.<br>

<br>additional behaviors (such as tooltip, dropdown, focus, click, etc.) should be implemented in wrappers.

### React Code Example

**Example 1:**

```jsx
//code example goes here
import * as React from 'react';
import { Avatar } from 'wix-ui-core/Avatar';
import { AvatarIcon } from 'my-icons/AvatarIcon';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{

    render() {
        return (
            <div>
                <Avatar
                    className={style.avatar}
                    name="John H. Doe"
                    text="Doe"
                    imgProps={{
                        srcset="elva-fairy-320w.jpg 320w, elva-fairy-800w.jpg 800w"
                        sizes="(max-width: 320px) 280px, 800px"
                        src="elva-fairy-800w.jpg"
                    }}
                    icon={<AvatarIcon/>}
                    />
            </div>
        )
    }
}
```

## Style API

### Selectors (pseudo-elements)

| selector          | description                        | type | children pseudo-states |
|:------------------|:-----------------------------------|:-----|:-----------------------|
| root       | Allows styling the background      |      |                        |
| ::content | Allows styling the content container |      |                        |

### States
| state        | description                        | type |
|:-------------|:-----------------------------------|:-----|
| imgLoaded   | true when the img was loaded     | boolean  |
| contentType  | Which content type is currently displayed | enum(image,icon,text) |

### Style Code Example

```css
:import {
  -st-from: './components/avatar';
  -st-default: Avatar;
}

.root {
}
.avatar {
  -st-extends: Avatar;
}
.avatar::text-container {
  color: red;
}
```

## Accessibility & Keyboard Navigation

The root will have `tabIndex = 0` by default meaning it will be focusable and part of the keyboard navigation flow.<br>
If no  `ariaLabel` prop is provided `aria-label={this.props.name}` will be put on the root<br>
