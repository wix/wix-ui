# Usage

## get started with react and wix-ui in no time.


wix-ui components are built using typescipt and stylable. exposing a strongly typed API for all public API's.

styles can be choosen or cutomized using stylable st.css files.


you can find the documentation of the different components here ( add link )

## Quick start

Here's a quick example to get you started, **its literally all you need:**




## Normal usage

as a best practice when creating an application you will need to create a stylable.css file for the root of your application.

this best practice doe'snt apply to the Wix backoffice environment. read those guidlines below.

Heres a simple resposnive example:


**application code**
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'wix-ui-core';
import styles from './app.st.css';
function App() {
  return (
        
        <div { /****  connect the root ****/ ...styles('root',{},this.props)}>
            <Button /****  connect the button style ****/ {...styles('btn')}>
            Hello World
            </Button>
        </div>
  );
}
```
**application style**
```css

    <!- import a specific style from a theme -->
    :import{
        -st-from:'wix-ui-core/backoffice-theme.st.css';
        -st-named:largeButton, smallButton;
    }

    <!- apply where needed -->
    .btn{
        -st-mixin:largeButton;
        float:left;
    }

    <!- change styles in media query -->  
    @media (max-width: 600px) {
    .btn{
        -st-mixin:smallButton;
        float:right;
    }
}

```


## Backoffice usage

In the Wix backoffice we choose to work in a more restricted environment.
as no extra CSS is needed for layouting, and no customization is allowed usage is simpler:

**application code**
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'wix-ui-core';
import styles from 'wix-ui-core/backoffice-theme.st.css';
function App() {
  return (
        
        <div { /****  connect the theme ****/ ...styles('root',{},this.props)}>
            <Button /****  connect the button style ****/ {...styles('largeButton')}>
            Hello World
            </Button>
        </div>
  );
}
```

# Instalation

to install:

```

    npm install wix-ui-core
```


the Wix UI packages all follow strict sermver rules. make sure no to use latest version as we might break API's on major version releases