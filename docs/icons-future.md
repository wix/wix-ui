## stylable-icon

Ido started working on the [stylable-icon](https://github.com/wix/stylable-icon) library that allows to inject into DOM icons specified through CSS.

## Icons in CSS

It's easy to create Stylable formatters that inline SVG icons into CSS:
~~~css
:import {
  -st-from: 'wix-ui-icons-common/Check';
  -st-named: Check;
}

Checkbox:checked::box {
  background-image: Check(#2196F3);
}
~~~

## Parametric Icons
A component such as StarRating might need an icon that has multiple variations: empty star, full star, 0.314 of a star. While the StarRating could take a plain SVG and clip it using CSS, it's more flexible to define the star icon as a React component that itself can render different SVG paths or apply different CSS styles based on a custom prop, such as `visiblePortion`:

~~~js
function StarRatingIcon({visiblePortion, children}) {
  return /* clip children based on visiblePortion */;
}

function StarRating(props) {
  return (
    // ... stuff
    <props.icon visiblePortion={0.314} />
    // ... stuff
  );
}

<StarRating icon={<StarRatingIcon><Heart /></StarRatingIcon>} />
~~~

## Composite Components

If one core component contains another, there’s a question of how to provide icons to that internal component and to its own internal components, e.g. DateRangePicker → DatePicker → Dropdown → toggleIcon. In most cases CSS should be sufficient (although we still need to figure out our general CSS approach to composite components), but if we ever run into problems we’ll think about a solution based on React context.

There are a few things to consider:

Suppose the core checkbox component uses `context.icons.checkmark`. Someone wants to create a theme where checkboxes have an “✕” icon instead, and changes `context.icons.checkmark accordingly`. Suddenly text inputs begin to show “✕” as an indicator of successful validation, because they also use `context.icons.checkmark`

Even if components use semantic names for icons the problem still exists. Imagine two components that have a button for incrementing their value. They both use `context.icons.increment`, but in one component it should look like “+”, and in the other like “▴”.

One possible solution is to identify icons by the class name they have in the component’s stylesheet:

~~~js
context.icons = {
  [checkboxStyle.checkedIcon]: '✓',
  [checkboxStyle.uncheckedIcon]: '✗',
  [starRatingStyle.starIcon]: '★'
};
~~~

Another option is to have a namespace for each component:

~~~js
context.icons = {
  [checkbox]: {
    checked: '✓',
    unchecked: '✗'
  },
  [starRating]: {
    starIcon: '★'
  }
};
~~~

Here `[checkbox]` is a symbol provided by the Checkbox component. It’s possible to extend this appoach to allow nested selectors like in SCSS, which would make it possible to have different icons in a standalone checkbox and in a checkbox inside of a dropdown menu. But realistically, that’s a lot of added complexity for a pretty small benefit.
