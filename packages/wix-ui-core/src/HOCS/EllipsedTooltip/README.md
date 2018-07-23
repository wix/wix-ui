# EllipsedTooltip HOC

A HOC which desgined to wrap Text components.<br/>
When the text overflows, the HOC will do the following:

1. Apply ellipsis on the text.
2. Display tooltip with the full text when hovering over the ellipsed text.

## API
`showTooltip` - A boolean param that specifies whether to display a tooltip on mouse hover, or not. The defaule value is `true`.

## Usage Example
In order to create the wrapped text component:

```js
import {withEllipsedTooltip} from 'wix-ui-core/hocs';

const WrappedText = withEllipsedTooltip({showTooltip: true})(Text);
```
