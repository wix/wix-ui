# wix-ui-icons-common
A set of commonly used icons for the Wix UI design system.

## Installation

```bash
npm install wix-ui-icons-common
```

## Usage

You should use the system icons for internal components and the general icons for the consumer of your project:
```jsx
import SomeGeneralIcon from 'wix-ui-icons-common/general/SomeGeneralIcon';
import SomeSystemIcon from 'wix-ui-icons-common/system/SomeSystemIcon';
```

### Properties

| prop name | type | default value | required | description |
|----------|----------|--------------|------------|-------------|
| size | string | 1em | - | Shorthand for setting width and height attributes of the SVG to the same value |
| ***All other Props are passed to the SVG element*** | | | | |

## Adding a new Icon

Before adding a new icon, please consult with your relevant UX. Not from Wix? Please open a [github issue](https://github.com/wix/wix-ui/issues/new) and we'll be happy to help

### Guidelines
* SVG icons will be transformed into their monochrome version and be stripped from redundant data they should be as lean as possible and should contain only `path`s and `shape`s.
* Make sure to remove `def`, `mask` `stroke`, `fill`, `transform`, `mirror`, `border thickness` and any other similar attributes that doesn't make the component flat.
* the `id` attribute should be removed as well.
* Make sure SVGs are correctly exported from Illustrator/Sketch/Figma, meaning they should merge all layers into one, and apply the masks, which will result in an SVG with a single path.
* Use a descriptive name since it'll be used as the React component name.
* If the icon has multiple variations (small, large, outlined, filled), specify the variation at the end of the file name, e.g. `FormFieldErrorSmall.svg`.
* Add the new SVG file to the `src/general/raw` or `src/system/raw` folder according to its purpose of usage (internal or external)
