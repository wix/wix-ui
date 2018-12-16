# Video

Video is a type of element for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, Vimeo and DailyMotion.
The element parses a URL and loads in the appropriate external SDKs to play media from various sources.

## API

#### Component Props

| name      | type                             | defaultValue | isRequired | description                                                            |
|:----------|:---------------------------------|:-------------|:-----------|:-----------------------------------------------------------------------|
| src       | string | string[]                |              | true       | The source or link of the video                                        |
| id        | string                           |              |            | Element ID                                                             |
| width     | number | string                  |              |            | Set the width of the player                                            |
| height    | number | string                  |              |            | Set the height of the player                                           |
| fillAllSpace | string                        |              |            | Pass `true` to alow player fill all space of it container              |
| playing   | boolean                          |              |            | Set to `true` or `false` to pause or play the video                    |
| muted     | boolean                          |              |            | Mutes the player                                                       |
| loop      | boolean                          |              |            | Loop video playback                                                    |
| volume    | number                           | 100          |            | Start value of volume for audio, `0..100`                              |
| controls  | boolean                          | true         |            | Pass false to hide controls                                            |
| showTitle | boolean                          | true         |            | Pass false to hide title                                               |
| config    | object                           | {}           |            | Override options for the various players                               |
| playerRef | Function                         |              |            | Use `playerRef` to call instance methods                               |
| onPlay    | Function                         |              |            | Called when media starts or resumes playing after pausing              |
| onPause   | Function                         |              |            | Called when media is paused                                            |
| onEnded   | Function                         |              |            | Called when media finishes playing                                     |
| onFirstPlay | Function                       |              |            | Called when media first time starts playing                            |
| onFirstEnded | Function                      |              |            | Called when media first time finishes playing                          |
| onReady   | Function                         |              |            | Called when media is loaded and ready to play. If playing is set to true, media will play immediately |
| onInit    | Function                         |              |            | Called when player is initialized                                      |



### React Code Example

**Example 1:**

```jsx
//code example goes here
import * as React from 'react';
import { Video } from 'wix-ui-core/Video';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{

    render() {
        return (
            <div>
                <Video
                    src="video-source.mp4"
                    loop={false}
                    playing={true}
                    muted={true}
                    {...style('root', {}, {})}
                />
            </div>
        )
    }
}
```


## Style API

### Selectors (pseudo-elements)

| selector          | description                        | type | children pseudo-states |
|:------------------|:-----------------------------------|:-----|:-----------------------|
| root              | Allows styling the player container |     |                        |


### Style Code Example

```css
:import {
  -st-from: './components/Video';
  -st-default: Video;
}

.root {
 -st-extends: Video;
 box-shadow: 2px 2px 10px #123456;
 border: 2px solid #123456;
}

```
