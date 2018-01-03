# Icons

> SVG Icon base type. The list of existing icons can be found [here]('https://wix.github.io/wix-style-react/?selectedKind=6.%20Common&selectedStory=6.5%20Icons&full=0&down=0&left=1&panelRight=0') 

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| size | string | 1em | - | Set the size of the icon |
| ***All other Props are passed to the SVG element*** | | | | |

## Adding a new Icon

* Add the new SVG file to the src/Icons/raw folder. Use a descriptive name since it'll be used as the React component name.
* Run `npm run build`
* You can now import your icon by name from the `wix-style-react/dist/src/Icons` folder!

**Notice that during `npm run build` the SVG files go through various optimizations hence it is recommended to validate the outcome of the icons in storybook (`npm start` and navigate to Icons)!** 
