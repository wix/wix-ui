# What are themes

## Core Library
A set of fully functional components with a basic styling that can easily be themed and styled.

 This library is called `wix-ui-core`.

## Theme Library
A set of components and styles that have a common look and behavior that serves the same usage.
For example, a backoffice application will use a library called `wix-ui-backoffice`.

The library will usually use the wix-ui-core components and wrap it with some custom styles.
Sometimes there might be components and composition of components which does not fit to the core and will be implemented only in the theme library.

## Themed Component
A component that wraps a core component and pass to is a **theme object** that defines its styles.
