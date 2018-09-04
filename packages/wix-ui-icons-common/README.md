# wix-ui-icons-common

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| size | string | 1em | - | Shorthand for setting width and height attributes of the SVG to the same value |
| ***All other Props are passed to the SVG element*** | | | | |

## Adding a new Icon

* Make sure that icon optimization guideline is followed.
* Add the new SVG file to the `src/general/raw` or `src/system/raw` folder. Use a descriptive name since it'll be used as the React component name.
* Run `npm run build`
* You can now import your icon by name from the `wix-ui-icons-common` folder! For example: `import {Add} from 'wix-ui-icons-common/Add';`

## Icon optimization guideline

* A designer must remove all "transform", "mirror", "border thickness" and similar attributes before handing it to our library.
* The icon files should not contain IDs, class names, stroke and fill colors.
* https://jakearchibald.github.io/svgomg/ can be used for optimization.

**Notice that during `npm run build` the SVG files go through various optimizations hence it is recommended to validate the outcome of the icons in storybook!**