`StoryNew` should become `Story` once all runtime autodocs are moved to
buildtime.

`StoryNew` is a function that calls `storiesOf` of storybook and passes
relevant data to `StoryPage` - a dumb component that only renders received
props
