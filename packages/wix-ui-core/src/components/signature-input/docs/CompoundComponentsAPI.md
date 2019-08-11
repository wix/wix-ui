### `<SignatureInput.Title/>`

A render slot for the signature input title

| propName   | propType | defaultValue | isRequired | description                                                                                                                                                                                                                                       |
| ---------- | -------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | function |              |            | A function: `({getTitleProps}) => element`. Returns a JSX element representing the title. `getTitleProps` function returns all necessary props for the title to be rendered properly. All of title custom props should be sent to `getTitleProps` |

### `<SignatureInput.SigningPad/>`

A render slot for the signature input signing pad

| propName    | propType | defaultValue | isRequired | description                                                               |
| ----------- | -------- | ------------ | ---------- | ------------------------------------------------------------------------- |
| `data-hook` | string   |              |            | Testing ID                                                                |
| `penColor`  | string   | 'black'      |            | Color of the signature                                                    |
| `penWidth`  | number   | 2.5          |            | The width of the signature                                                |
| `onInit`    | function |              |            | Callback that provides an imperative API for manipulating the signing pad |
| `canvasRef` | function |              |            | Callback to get an instance of the canvas HTML element instance           |

### `<SignatureInput.ClearButton/>`

A render slot for the signature input clear button. Passing `onClick` to `getClearButtonProps` will be invoked after the signature has been cleared

| propName   | propType | defaultValue | isRequired | description                                                                                                                                                                                                                                                                              |
| ---------- | -------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | function |              |            | A function: `({getClearButtonProps}) => element`. Returns a JSX element representing the clear button. `getClearButtonProps` function returns all necessary props for the clear button to be rendered properly. All of clear button custom props should be sent to `getClearButtonProps` |
