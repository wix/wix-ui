# MediaImage

## Description

The **MediaImage** component accepts **MediaPlatformItem** object and convert it to native HTML \<img/>.

## API

**Props**

**MediaImage** accepts 

| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| mediaPlatformItem | MediaPlatformItem | ✖ | ✔ | media platform item to be used as the source for the media |
| width | number | mediaPlatformItem.width | ✖ | the width of the image |
| height | number | mediaPlatformItem.height | ✖ | the height of the image |
| className | string | ✖ | ✖ | A class name to be applied on the root element |
| onLoad | (event: ImageEvent) => void;| noop | ✖ | An event handler triggered by the state's status. |
| onError | (event: ImageEvent) => void; | noop | ✖ | An event handler setting an Error state. |
| errorMediaPlatformItem | MediaPlatformItem | ✖  | ✖ | media platform item to be used as the source for error media |
| alt | string |   ✖   | No | alternative text for the image used ny screen readers |
| scale | 'fill' / 'fit' |   'fill'   | No | change image sizing options inside the container |


#### `MediaPlatformItem`

| Property         |                 Type                  | default | Required | Description                              |
| ---------------- | :-----------------------------------: | :------: | :------: | ---------------------------------------- |
| width | number |   ✖   | Yes | width of the source image. |
| height | number |   ✖   | Yes | height of the source image. |
| uri | string |   ✖   | Yes | relative url of the image |
| mediaType | 'picture' &#124; 'video' | ✖ |   Yes   | type of the the media item |
| options | MediaItemOptions | ✖ | No | additional options for the media image |

#### `MediaItemOptions`

| Property         |                 Type                  | default | Required | Description                              |
| ---------------- | :-----------------------------------: | :------: | :------: | ---------------------------------------- |
| focalPoint | FocalPoint |   ✖   | No | coordinates for positioning a cropped image (0-100) |
| quality | number |   80   | No | the quality of the image (5-80) |
| unsharpMask | UnsharpMaskOptions |   ✖   | No | apply an unsharp mask to the image |
| watermark | string |   ✖   | No | watermark manifest id |
| upscaleMethod | MediaImageUpscaleMethod |   'auto'   | No | upscale method used |
| isSEOBot | boolean |   false   | No | - |
| filter | MediaItemFilters |   ✖   | No | filters applied to image |

#### `FocalPoint`

| Property         |                 Type                  | default | Required | Description                              |
| ---------------- | :-----------------------------------: | :------: | :------: | ---------------------------------------- |
| x | number |   ✖   | Yes | x coordinates for positioning a cropped image (0-100) |
| y | number |   ✖   | Yes | y coordinates for positioning a cropped image (0-100) |

#### `MediaItemFilters`

| Property         |                 Type                  | default | Required | Description                              |
| ---------------- | :-----------------------------------: | :------: | :------: | ---------------------------------------- |
| blur | number |   0   | No | image blur (0-100) |

**Example:**

```jsx
import * as React from 'react';
import {MediaImage} from 'wix-ui-core/media-image';

export class MediaImageDemo extends React.Component {
    render() {
        const mediaPlatformItem = {
            width: 400,
            height: 400,
            uri: '3660b797a48b4401948dd686a7c625db.jpg"
            mediaType: 'picture'
        };
        
        const errorMediaPlatformItem = {
            width: 400,
            height: 400,
            uri: '3660b797a48b4401948dd686a7c625db.jpg"
            mediaType: 'picture'
        };
        
        return (
            <h2>MediaImage</h2>
            <MediaImage                      
                mediaPlatformItem={mediaPlatformItem}
                errorMediaPlatformItem={errorMediaPlatformItem}
            />
        );
    }
}
```
*Example of rendering the MediaImage component, passing it specific props and characteristics*

