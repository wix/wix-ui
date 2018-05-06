# Contributing components

Components are divided into 2 groups:

## UX blocks:
very simple stateless components used for creating the same compositions across our different applications.

## Actual components:
Components with logic. (and in many cases state)

## How do i decide if to write a UX block or component

it is much easier to write UX blocks, so if you can, please do.

in a UX block you can:
- render a structure of html and components
- hide and show nodes

### Example UX Block

```jsx
import {DropDown, DropDownProps} from '../drop-down'
import {HTMLLabelProps} from 'react';
import {styles} from './component-name.st.css';

export interface BlockProps {
  label:?HTMLLabelProps;
  dropDown:DropDownProps;
  className:string;
}

export const ComponentName = (props:BlockProps)=><div styles('root',{},props)>
  {props.label ? <label {...props.label} {...styles('label')}/> : null}
  <DropDown {...props.dropDown} {...styles('drop-down')}/>
</div>
```




## Getting started
```
git clone git@github.com:wix/wix-ui.git
cd wix-ui
npm install
npm run rebuild
code .
```

Example UX Block:

Files:

 - component-name/component-name.tsx - the code
 - component-name/component-name.st.css - the style API
 - component-name/component-name.meta.ts - meta-data used for documentation and testing

component-name.tsx
```jsx
import {DropDown, DropDownProps} from '../drop-down'
import {HTMLLabelProps} from 'react';
import {styles} from './component-name.st.css';

export interface BlockProps {
  label:HTMLLabelProps;
  dropDown:DropDownProps;
  className:string;
}

export const ComponentName = (props:BlockProps)=><div styles('root',{},props)>
  <label {...props.label} {...styles('label')}/>
  <DropDown {...props.dropDown} {...styles('drop-down')}/>
</div>
```

component-name.st.css
```css
:import{
  -st-default:DropDown;
  -st-from:'../drop-down/drop-down.st.css';
}
.label{
}
.drop-down{
  -st-extends:DropDown;
}
```

component-name.meta.ts
```tsx
import {registerMeta} from '../../utils/register-meta';
import {ComponentName} from './component-name.tsx';

registerMeta.for(componentName).
      

```



