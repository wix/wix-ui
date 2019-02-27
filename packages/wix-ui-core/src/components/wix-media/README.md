# WixMedia

## Description

The **WixMedia** component excepts **MediaPlatformItem** object and convert it to native HTML \<img/>.

## API

**Props**

**WixMedia** accepts 

| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| mediaPlatformItem | MediaPlatformItem | ✖ | ✔ | media platform item to be used as the source for the media |
| width | number | mediaPlatformItem.width | ✖ | the width of the image |
| height | number | mediaPlatformItem.height | ✖ | the height of the image |
| onLoad | (event: ImageEvent) => void;| noop | ✖ | An event handler triggered by the state's status. |
| onError | (event: ImageEvent) => void; | noop | ✖ | An event handler setting an Error state. |
| errorMediaPlatformItem | MediaPlatformItem | ✖  | ✖ | media platform item to be used as the source for error media |

#### `MediaPlatformItem`

| Property         |                 Type                  | default | Required | Description                              |
| ---------------- | :-----------------------------------: | :------: | :------: | ---------------------------------------- |
| width | number |   ✖   | Yes | width of the source image. |
| height | number |   ✖   | Yes | height of the source image. |
| uri | string |   ✖   | Yes | relative url of the image |
| mediaType | 'picture' &#124; 'video' | ✖ |   Yes   | type of the the media item |
| alt | string |   ✖   | No | alternative text for the image used ny screen readers |

**Example:**

```jsx
import * as React from 'react';
import {WixMedia} from 'wix-ui-core/WixMedia';

export class WixMediaDemo extends React.Component<{}, WixMediaDemoState> {
    render() {
        const mediaPlatformItem = {
            width: 400,
            height: 400,
            uri: '3660b797a48b4401948dd686a7c625db.jpg"
            mediaType: 'picture'
        };
        
        return (
            <h2>WixMedia</h2>
            <WixMedia                      
                mediaPlatformItem={mediaPlatformItem}
                errorImage="https://cdn.pixabay.com/photo/2016/10/10/12/02/eagle-owl-1728218_960_720.jpg"
            />
        );
    }
}
```
*Example of rendering the WixMedia component, passing it specific props and characteristics*

