`story` is a function that calls `storiesOf` of storybook and passes
relevant data to `StoryPage` - a dumb component that only renders received
props.

## Usage
* `renderManualStory` (()=>ReactElement): A function that return a manual story (overriding AutoDocs default template). It receives an object with all AutoDocs context, so you can manually build the story page from wix-storybokk-utils's components. In particular, the context includes an `isTestMode` which may be used for e2e tests. If it returns anything `falsy` then the AutoDocs default Story template (`<StoryPage/>`) would be rendered.

```js
export default {
  ...
  renderManualStory: ({
    isTestMode: isE2E,
    component,
    displayName,
    componentProps,
    examples,
    exampleProps,
    exampleImport,
    codeExample,
    _config,
    _metadata
    }) => isTestMode ? <div>my test div</div> : undefined;
}
```
