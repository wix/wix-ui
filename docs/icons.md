# Using Icons

## Quick Example

In `wix-ui-core`:
~~~jsx
// One prop per icon.

// No bundled icons.

// Icons are rendered into a <div> placeholder to make it possible to change them through CSS.

const Checkbox = ({checked, checkedIcon, uncheckedIcon, ...props}) => (
  <div className={...style('root', {checked}, props)}>
    <div className={style.box}>
      {checked ? checkedIcon : uncheckedIcon}
    </div>
  </div>
);
~~~

In `wix-ui-backoffice`:
~~~jsx
import {CheckboxChecked} from 'wix-ui-icons-common/system';

const Checkbox = props => (
  <CoreCheckbox checkedIcon={<CheckboxChecked />} {...props} />
);
~~~

## Core Component Guidelines
Сore components shouldn’t come with any icons. Instead they should receive icons through props of type `JSX.Element`, and render them into a `<div>` placeholder that users can style using `background-image` if they prefer to provide icons through CSS.

In components where icons are optional (such as buttons and badges) instead of having placeholders for prefix and suffix icons it makes more sense to let the users pass icons as children with all necessary styles already applied.

## Multi-state Icons

Components such as checkboxes and radio buttons should have a separate icon prop for each state:

~~~jsx
<Checkbox checkedIcon="👍" uncheckedIcon="👎" indeterminateIcon="🤔" />
~~~

They should render all icons into the same container, e.g. `<div className={style.box}>`. In CSS `Checkbox::box` selector can be used to target all states at once, and `Checkbox:checked::box` to target a specific state.

## Animated Icons
To use an icon that animates between on and off states you can pass it as both `checkedIcon` and `uncheckedIcon`, but with different props, and React [will reuse the icon instance](https://stackblitz.com/edit/react-csqq9e?file=index.js) when switching.

~~~jsx
<Checkbox
   checkedIcon={<AnimatedCheckmark checked />}
   uncheckedIcon={<AnimatedCheckmark />}
/>
~~~

## RTL and Arrow Icons
If component receive props such as `forwardIcon` and `backIcon`, or `nextIcon` and `previousIcon`, it shouldn't try to be smart and swap them in RTL mode. One reason is that it can be confusing to users who themselves provide correct icons for each mode:

~~~jsx
<Carousel dir="ltr" backIcon="←" forwardIcon="→" />
<Carousel dir="rtl" forwardIcon="←" backIcon="→" />
~~~

Second, this approach doesn't scale to a more general case when the component also needs to support vertical orientation.

Third, sometimes it's better to give the component `previousLabel` and `nextLabel` props that can contain text, icon, or text with an icon, and in this case naive swapping doesn’t work.

## Examples of Styling
https://jsfiddle.net/e1y3gtwf/ – hover effect using :before and :after

https://jsfiddle.net/6sghnkbd/ – hover effect using filter

https://jsfiddle.net/4kw9sze0/ – background image sizing

https://jsfiddle.net/k5c5gcfy/ – SVG element sizing

https://jsfiddle.net/0tcz883n/ – SVG fill that matches the text color

## [Future Options](icons-future.md)

Composite components, parametric icons, icons in CSS, stylable-icon.