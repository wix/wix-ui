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
* Make sure to remove `def`, `mask` `stroke`, `fill`, `transform`, `mirror`, `border thickness` and any other similar attributes that doesn't make the component flat. https://jakearchibald.github.io/svgomg/ can be used for SVG optimization.
* the `id` attribute should be removed as well.
* Make sure SVGs are correctly exported from Illustrator/Sketch/Figma, meaning they should merge all layers into one, and apply the masks, which will result in an SVG with a single path.
* Use a descriptive name since it'll be used as the React component name.
* If the icon has multiple variations (small, large, outlined, filled), specify the variation at the end of the file name, e.g. `FormFieldErrorSmall.svg`.
* Add the new SVG file to the `src/general/raw` or `src/system/raw` folder according to its purpose of usage (internal or external)

* Every icon must have additional metadata describing the following attributes:

	* `title` - the name of the icon
	* `category` - icon type (`Actions`, `Communication`, etc.)
	* `description` - a short summary explaining the purpose of the icon and the context where it may appear
	* `tags` - list of terms that may apply to icon, used in storybook search
	* `sizes` - maps between the icon size in pixels (`"18"`/`"24"`) to the file name
	* `aliases` - list of other filenames the icon appears as

	When adding an icon, add the icon's metadata to the following file:
	[src/general/metadata.ts](https://github.com/wix/wix-ui/blob/master/packages/wix-ui-icons-common/src/general/metadata.ts) *for general icons*
	or [src/system/metadata.ts](https://github.com/wix/wix-ui/blob/master/packages/wix-ui-icons-common/src/system/metadata.ts) *for system icons*

* After PR is merged to `wix-ui`, trigger and wait for `wix-style-react` build to finish, and approve new icons snapshot base-line (In Applitools)
