# Image

## Description

The **Image** component represents an image on the DOM.

## API

**Props**

**Image** accepts all native `<img />` attributes, with several additional features listed below.


| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| src | string | - | ✖ |  Contains the path to the image you want to embed. |
| alt | string | - | ✖ | Contains a textual description of the image. |
| title | string | - | ✖ | Specifies extra information about an element, shown as a tooltip text. |
| onLoad | (event: ImageEvent) => void; | noop | ✖ | An event handler triggered by the state's status. |
| onError | (event: ImageEvent) => void; | noop | ✖ | An event handler setting an Error state. |
| resizeMode | 'fill' \| 'cover' \| 'contain' | 'fill' | ✖ | Defines how the Image responds to the height and width of its content box. |
| defaultImage | string | - | ✖ | URL to load when src is not provided. |
| errorImage | string | - | ✖ | URL to load if src (or defaultImage) loading result in an error. |
| loader | 'icon' \| 'dots' \| 'spinner' | - | ✖ | Element being displayed during the loading time. |



### React Code Example
TODO: change the example by for the new components (new stylable version)

**Example 1:**

```jsx
import * as React from 'react';
import {Image} from 'stylable-components';
import {stylable} from 'wix-react-tools';
import style from './image-demo.st.css';

@stylable(style)
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
                        src={this.state.src}
                        resizeMode={this.state.resizeMode}
                        className="myImage"
                        defaultImage="https://c1.staticflickr.com/7/6005/5927758528_a2060423e7_b.jpg"
                        errorImage="https://cdn.pixabay.com/photo/2016/10/10/12/02/eagle-owl-1728218_960_720.jpg"
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
*Example of rendering the Image component, passing it specific props*

## Style 

The style states are derived from ImageStatus which can be one of the following options: { Loaded, Loading, Error }.

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
Our components is accessible according to [WAI-ARIA 1.0](https://www.w3.org/TR/wai-aria/) standards.
We follow these guidelines when [using ARIA](https://www.w3.org/TR/using-aria/#intro).

An alt attribute's value should clearly and concisely describe the image's content. It should not describe the presence of the image itself, or the file name of the image. If the alt attribute is purposefully left off because the image has no textual equivalent, consider alternate methods for presenting the content the image is trying to communicate. e.g: 

```jsx
    <Image
        alt="A Rockhopper Penguin standing on a beach" src="penguin.jpg"
    />
```
When an alt attribute is not present on an image, some screen readers may announce the image's file name instead. This can be a confusing experience if the file name isn't representative of the image's contents.

## Behavior

#### Resize Modes

`<Image>` allows specifying a `resizeMode` prop with these possible values: `fill`, `contain`, and `cover`. The behavior of `resizeMode` is the same as that of the CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) prop, except that `resizeMode` supports older browsers that don't support `object-fit`.

> Note: Just as in `object-fit`, `resizeMode` only affects images with both width and height axes provided (e.g. `width: 200px; height: 200px;`).


#### Avoiding user-agent "broken image" outline

When an `<img />` has no `src` prop, or it fails to load the specified image, some web browsers show a "broken image" placeholder or an outline around the element. These typically do not conform to the page design causing the page to appear broken.

The `<Image />` component allows supplying `defaultImage` to replace `src` if missing. If the source fails loading `errorImage` will be displayed. If `errorImage` is not supplied the `<Image/>` component will render an empty pixel.

```
src -> defaultImage -> errorImage -> one empty pixel
```

#### Edge case handling

Source loading and resulting states breakdown table:

| src | defaultImage | errorImage | source to be displayed | component status |
| --- | ------------ | ---------- | ---------------------- | ---------------- |
| ✔ | |  | src | Loaded |
|  |✔ |  | defaultImage | Loaded |
|  | |  | one empty pixel | Loaded |
|  |  | ✔ | one empty pixel | Loaded |
| ✔ | ✔ |  | src | Loaded |
| ✖ |  | ✔ | errorImage | Error |
|  | ✖  | ✔ | errorImage | Error |
| ✖ |  | ✔ | errorImage | Error |
| ✖ |  |  | one empty pixel | Error |
|  | ✖ |  | one empty pixel | Error |
|  | ✖ | ✖ | one empty pixel | Error |
|  | ✖ | ✖ | one empty pixel | Error |
|  |  | ✖ | one empty pixel | Loaded |

legend:

✔ - source provided and is loaded successfully

✖ - source provided but loading results in error

(empty) - source was not provided

## Public Test Driver

Alongside the component we usually provide our users with a test driver to simplify testing their app's behavior to interaction with the component. See [ImageDriver](./image-driver.ts).

### Test Driver API
> Note: ImageDriver API is an API for all intents and purposes, meaning changing this API may result in breaking changes for the component users. To avoid this scenario exclude unneeded methods from the public driver (helper methods for the component's tests can still be implemented in a "private" driver that extends the public one)

| name   | type                    | description |
|:-------|:------------------------|:------------|
| nativeElement | () => HTMLImageElement | return the native image element. |  
| source | () => string \| null | return the value of 'src' attribute of the element. | 
| hasStylableState | (stateName: string): boolean | return `true` when component has stylable state. |


[How to use drivers](https://github.com/wix/wix-ui/tree/master/packages/wix-ui-test-utils#testkit-helpers)
