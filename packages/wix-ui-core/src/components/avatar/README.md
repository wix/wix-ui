# Avatar

Avatar is a type of element that visually represents a user, either as an image, icon or initials.
<br><br>
![image](./readme-assets/avatar-types.png)
## Elements

Elements are "container" and content, which could be classified to either "text", "image" or "icon"

## API

#### Component Props

| name     | type                | defaultValue | isRequired | description                                                           |
| -------- | ------------------- | ------------ | ---------- | --------------------------------------------------------------------- |
| name     | string              |              | Yes        | The name of the avatar user. Initials will be generated from the name |
| imgProps | Omit<HTMLImageAttributes, 'alt'> |              |            | the source url to load image from                                     |
| icon     | JSX Element         |              |            | an SVG icon component                                                 |
| tabIndex | number              | 0            |            | the tabIndex value to put on the root                                 |

## General Behavior

this component will display content based on the props provided. For example, if `imgProps` is provided (and successfully loaded), it will display an image as content. If more than one type of content prop is provided, it will first attempt to load the image then icon and lastly initials.<br>

name conversion examples:
<br/> John Doe --> JD
<br/> John H. Doe --> JHD
<br/> John Hurley Stanley Kubrik Doe --> JHD

## Technical Considerations

The component will fallback to a different content prop in case the image provided didn't load. For this to happen an `onError` handler will be used on the `img` tag. If a user provided adn `onError` handler in `imgProps`, it will be called as well.<br>

<br> The `alt` property is omitted from `imgProps` interface. `name` prop will be used as `alt` instead.<br>

<br>`name` prop will also be used as `title` on elements to have native browser description tooltip.  

<br>additional behaviors (such as tooltip, dropdown, focus, click, etc.) should be implemented in wrappers. Examples TBD

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
                    name="John Doe"
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

#### Subcomponents (pseudo-elements)

| selector          | description                        | type | children pseudo-states |
| ----------------- | ---------------------------------- | ---- | ---------------------- |
| ::container       | Allows styling the background      |      |                        |
| ::image-container | Allows styling the image container |      |                        |
| ::icon-container  | Allows styling the icon container  |      |                        |
| ::initials        | Allows styling the text            | p    |                        |

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
The root should have an `aria-label={"Avatar for "+ name}`<br>

