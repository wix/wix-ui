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

## Theme Object
An object that defines certain customizable properties for the core component.

* Theme object is defined per component.
* These properties will be translated into css when passed to the core component.
* A theme can be a function that depends on the props of the themed component.
* A component theme must follow the core component theme’s properties, so it can be a subset of it but not have properties that core theme doesn’t support.

## Themes Structure
Read more about it [here](./THEMES_STRUCTURE.md)
