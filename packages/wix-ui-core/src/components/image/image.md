# Image

## Description

The **Image** component embeds an image into the document much like the HTML \<img> element. It also supports
additional features, both visual and behavioral, adding image customizations.

## API

**Props**

| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| onLoad | (event: ImageEvent) => void;| noop | ✖ | An event handler triggered by the state's status. |
| onError | (event: ImageEvent) => void; | noop | ✖ | An event handler setting an Error state. |
| resizeMode | 'fill' \| 'cover' \| 'contain' | 'fill' | ✖ | Defines how the Image responds to the height and width of its content box. |
| errorImage | string | ✖  | ✖ | URL to load if src loading result in an error. |
| placeholder | ReactNode | ✖  | ✖ | Placeholder to display while image is being loaded. |
| <img/> attributes | HTMLImageAttributes| - | - | Supports all native HTML <img/> attributes. |

**Image** accepts all native `<img />` attributes (which you can read about [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)), with several additional features listed below.

**Example 1:**

```jsx
import * as React from 'react';
import {Image} from 'wix-ui-core/Image';
import style from './image.st.css';

export class ImageDemo extends React.Component<{}, ImageDemoState> {
    public state: ImageDemoState = {
            src: 'https://cdn.pixabay.com/photo/2012/02/19/10/49/owl-14918_960_720.jpg',
            resizeMode: 'fill'
        };
    
        public render() {
            return (
                <div>
                    <h2>Image</h2>
                    <div>
                        <label>src:
                            <input type="text" value={this.state.src} onChange={this.onSrcChange} />
                        </label>
                        <select value={this.state.resizeMode} onChange={this.onResizeModeChange}>
                            <option value="cover">cover</option>
                            <option value="contain">contain</option>
                            <option value="fill">fill</option>
                        </select>
                    </div>
                    <Image
                        {...style('root', {}, this.props)}
                        src={this.state.src}
                        resizeMode={this.state.resizeMode}
                        className="myImage"
                        errorImage="https://cdn.pixabay.com/photo/2016/10/10/12/02/eagle-owl-1728218_960_720.jpg"
                        placeholder= {<Loader/>}
                    />
                </div>
            );
        }
    
        private onSrcChange: React.ChangeEventHandler<HTMLInputElement> = e => {
            this.setState({src: e.target.value});
        }
    
        private onResizeModeChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
            this.setState({resizeMode: e.target.value as ImageDemoState['resizeMode']});
        }
}

```
*Example of rendering the Image component, passing it specific props and characteristics*

## Style 

In addition to CSS’s native pseudo-classes, like :hover, for the Image component - Stylable enables you to define custom pseudo-classes so that you can apply styles to your components based on state.
In this case it can be styled as Loaded, Loading, or Error .

```css
/* image.st.css */

.root {
    -st-states: loaded, loading, error;
    display: inline-block;
}
```

#### States 

| state | description|
| ----- | -----------|
| :loading | Styles the Image when image is loading
| :loaded | Styles the Image after it loads successfully
| :error | Styles the Image after if it fails during loading


### Style Code Example

```css
:import {
    -st-from: './components/image'; 
    -st-default: Image;
}

.myImage {
    -st-extends: Image;
    width: 300px;
    height: 200px;
    marginTop: 10px;
}

.myImage:loaded { border: 3px solid gold }

.myImage:loading { border: 3px solid grey }

.myImage:error { border: 3px solid red }

```

## Accessibility

An alt attribute's value should clearly and concisely describe the image's content. It should not describe the presence of the image itself, or the file name of the image. If the alt attribute is purposefully left off because the image has no textual equivalent, consider alternate methods for presenting the content the image is trying to communicate. e.g: 

```jsx
    <Image
        alt="A Rockhopper Penguin standing on a beach" src="penguin.jpg"
    />
```
When an alt attribute is not present on an image, some screen readers may announce the image's file name instead. This can be a confusing experience if the file name isn't representative of the image's contents.

A disclaimer about title:

The title attribute is not an acceptable substitute for an alt attribute. 
Avoid duplicating the alt attribute's value in a title attribute declared on the same image. Doing so may cause some screen readers to announce the description twice, creating a confusing experience.

## Behavior

### Placeholder
The placeholder prop describes the loading state of the component.  It is represented as a ReactNode and works with the following types: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

#### Resize Modes

`<Image>` allows specifying a `resizeMode` prop with these possible values: `fill`, `contain`, and `cover`. The behavior of `resizeMode` is the same as that of the CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) prop, except that `resizeMode` supports older browsers that don't support `object-fit`.

> Note: Just as in `object-fit`, `resizeMode` only affects images with both width and height axes provided (e.g. `width: 200px; height: 200px;`).


#### Avoiding user-agent "broken image" outline

When an `<img />` has no `src` or  `srcset` as props - or even when it fails to load the specified image, some web browsers show a "broken image" placeholder or an outline around the element. These typically do not conform to the page design causing the page to appear broken.

In cases where the source fails to load - `errorImage` will be displayed. If `errorImage` is not supplied the `<Image/>` component will render an empty pixel.


#### Edge case handling

Source loading and resulting states breakdown table:

| src/ srcSet | errorImage | source to be displayed | component status |
| --- | ---------- | ---------------------- | ---------------- |
| ✔  |  | src | Loaded |
| ✔  | ✖ | src | Loaded |
| ✔  | ✔ | src | Loaded |
| ✖  | ✔ | errorImage | Error |
| ✖  | ✖ | one empty pixel | Error |
| ✖  |  | one empty pixel | Error |
|   | ✔ | one empty pixel | Error |
|  | ✖ | one empty pixel | Error |
|   |  | one empty pixel | Error |

## Placeholder will be added to the table later on
!! TBD !! 


legend:

✔ - source provided and is loaded successfully

✖ - source provided but loading results in error

(empty) - source was not provided

### Test Driver API 

!! TBD !!

We provide several helper functions for the Image's testkit:
 
| name   | type                    | description |
|:-------|:------------------------|:------------|
| getUrl | | | 
| getResizeMode | | | 

[How to use drivers](https://github.com/wix/wix-ui/tree/master/packages/wix-ui-test-utils#testkit-helpers)
