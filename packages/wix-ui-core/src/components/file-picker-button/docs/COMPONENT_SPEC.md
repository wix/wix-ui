# FilePickerButton

FilePickerButton component is a stylable button that opens system browser dialog for choosing files to upload.

## Elements

* chooseFileButton

## API

#### Component Props

| name                          | type            | defaultValue | isRequired | description                                                  |
| :---------------------------- | :-------------- | ------------ | :--------- | ------------------------------------------------------------ |
| className                     | string          |              | No         | Allows overriding the component's styles – see the [example](#style-code-example) below. |
| children                      | React.ReactNode |              | No         | Elements to render inside the button.                        |
| accept                        | string          |              | No         | A string that defines the file types the file input should accept ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)). |
| required                      | boolean         | false        | No         |                                                              |
| disabled                      | boolean         | false        | No         |                                                              |
| onFocus()                     | function        |              | No         |                                                              |
| onBlur()                      | function        |              | No         |                                                              |
| onChange(files: File[]): void | function        |              | No         | Triggered when the user finishes selecting files through a native OS file picker dialog. |

#### Instance methods

| method name | description                                                  |
| ----------- | ------------------------------------------------------------ |
| focus()     | focuses the button                                           |
| blur()      | blurs the button                                             |
| reset()     | resets the native file input's value. if the user selected a file, and then selected it again, the `onChange` won't be triggered again unless the `reset()` was called. |


## General Behavior
This component will render it's children inside a button. When the button is clicked, it opens the OS file picker dialog.

## Technical Considerations
Native `input[type="file"]`  is very hard to style. This component solves it by hiding the native input visually in SR-friendly way, and rendering a button instead, which can be easily styled.



### React Code Example

```jsx
import * as React from 'react';
import { FilePickerButton } from 'wix-ui-core/FilePickerButton';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{

    render() {
        return (
            <div>
                <FilePickerButton
                    className={style.filePickerButton}
                    accept=".jpg,.png">
                        <i>+</i> Choose a File
                </FilePickerButton>  
            </div>
        )
    }
}
```

## Style API

### Selectors (pseudo-elements)

| selector           | description               | type | children pseudo-states |
| :----------------- | :------------------------ | :--- | :--------------------- |
| root               |                           |      |                        |
| ::chooseFileButton | Allows styling the button |      |                        |

### States

| state    | description                        | type    |
| :------- | :--------------------------------- | :------ |
| required | whether the file input is required | boolean |
| disabled | whether the file input             | boolean |

### Style Code Example

```css
:import {
  -st-from: './components/file-picker-button';
  -st-default: FilePickerButton;
}

.root {
}

.filePickerButton {
  -st-extends: FilePickerButton;
}

.filePickerButton:required::chooseFileButton::after {
  content: " *";
}

.filePickerButton:disabled::chooseFileButton {
  color: grey;
}
```

## Accessibility & Keyboard Navigation

Native file input is visually hidden, but SR friendly, and it has `tabIndex = -1`, so that only the button is a part of the keyboard navigation flow.
