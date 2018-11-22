# What Are Themes
A Theme is a set of styles that are applied to a set of components, thus creating a common look for a design system.

## Core Library
A set of fully functional components with a basic styling that can easily be styled.

This library is called `wix-ui-core`.

## Theme Library
A set of components and styles that have a common look and behavior that serves the same usage.
For example, a backoffice application will use a library called `wix-ui-backoffice`.

The library will usually use the wix-ui-core components and apply the theme via css classes that are supplied in a separated theme folder/package.

Sometimes there might be components and composition of components which does not fit to the core and will be implemented only in the theme library.

## Stylable 
We use Stylable for Styling components.
The component defines a Stylable Stylesheet (`*.st.css`) file, which acts as a styling API.

The Theme stylesheets, extend and override the component's styling using that API.
