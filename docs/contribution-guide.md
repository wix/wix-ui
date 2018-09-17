# Contribution Guide
The **wix-ui** repository is a one-stop-shop for all the components that compose our products and our users' sites.

This library is a group effort across all Wix teams. We welcome everyone to contibute.

## Ownership and contribiution process

While we do want eveyone to contribute to this repo, we also have to ensure that we maintain the quality and constitency of the project's APIs.

@shachar -> add contribution process

## Discussions

To ensure that all project discussion is accessible via search, all issues and questions should be entered as GitHub issues inside the repo. If you have questions about how to use the library, or how the project is running, GitHub issues is the go-to tool for this project.


## Best practices

Our goal is for lots of developers to work on this project together so we want all best practices clearly documented and enforced.

We anticipate sending many contributers to RTFM ;-).

### General guidlines

You should write all component logic using strictly-typed [TypeScript](http://www.typescriptlang.org/) code. 
//ALR - repeated below? Assuming you're adding to this list? What about using Stylable st.css?//

### Project structure

Files and folders must be named in kebab-case, like “my-button.tsx” (and not camel cased like "myButton.tsx"). This solves an issue with Git in Windows. Git cares about case, Windows doesn’t.

@shachar -> i currently only did ui-core (according to what we discussed).

All component assets are saved in the same folder as the component, except for style variants. The components folder remains style agnostic so it can be used with any theme. The relevant component files are then replicated in a folder under a specific theme. 

In this example the button component files are under a `components` folder with no styles applied and under the `themes` folder, the `adi` theme includes the button component files.

##### Example
- src
    - components
        - button
            - button.tsx
            - button.st.css
            - button.spec.ts
            - button.driver.ts
            - button.meta.ts
    - themes
        - adi
            - button
                - button.st.css

For more details, take a look at [Create a Stylable Component Library](https://stylable.io/docs/guides/stylable-component-library).
        
## Creating new components

Components are great building blocks. But not every element has to be a new component. Before creating a new component, consider the option of creating a new reusable style for an existing component or for an HTML element. It's faster, and costs less on your runtime

When you create a component, you must have component logic using strictly-typed [TypeScript](http://www.typescriptlang.org/) code. And a style API using [Stylable](https://stylable.io/).

### Component logic

**component.tsx**
//ALR - add example code here for button?//

All component APIs must be strongly typed, no accepting the `any` object. It may be harder to write, but it's much easier to use.

All components define `react-prop-types`. This is to support our friends who still use vanilla JS.

### Component style API

**component.st.css**

Component `st.css` files define the component's style API.

A component imports the following **[Stylable](https://stylable.io/)** file:
```css
.button1{

}

.button2{

}
```
exposing both the `button1` class and `button2` class to **Stylable** so they can be customized.

#### Include essential rules only

Although it may be tempting to add rules to a component's CSS, for it to be truly reusable and customizable, its CSS should be as devoid of rules as possible. Add only rules that are essential to the component's functionality and leave the rest open to customizations and themes.

When working on a component, it's always good to create a style variant of it for development purposes.

#### Expose the API

Unlike normal component properties, which result in runtime costs, CSS APIs have very little runtime cost.

You should always open up the API as much as possible, Put special attention to clear naming of CSS classes since these form the component's style API. Later changes in these could result in major version update.

##### Expose all meaningfull nodes

If you believe someone else might need to customize a node, create a class for it and expose it even if your design use case does not need to customize the node.

##### Define each class well

If a class is assigned to a component, specify this in its `st.css` stylesheet.

```css
:import{
    -st-from: "../button/button.st.css";
    -st-default: Button;
}
.button1{
  -st-extends:Button;
}
```

This allows customization of the button internal parts of the `button1` [class](https://stylable.io/docs/references/class-selectors).

##### Add Stylable states

**Stylable** [states](https://stylable.io/docs/references/pseudo-classes) are a way for a component to define its different visual states.

For example, a drop down component might expose an "open" state, so it can be customized differently while open.
//ALR - add example?//

In a calander scenario, we might want several different states to potentially be applied to a day:

```css

.day{
    -st-states: isWeekDay, isWeekEnd, isPast, isToday;
}

```

```tsx

import React as * from 'react';
import styles from './date-picker.st.css'
import DateUtils from 'somewhere';

export const day = (props:{date:number})=>{
    return <span {...styles('day',{
        isWeekDay: DateUtils.isWeekDay(date),
        isWeekEnd: DateUtils.isWeekEnd(date),
        isPast: DateUtils.isPast(date),
        isToday: DateUtils.isToday(date),
    })}>{DateUtils.prettyPrint(date)}</span>
}
```

Exposing states allows richer style variants for each component.

### Component tests

**component.spec.tsx**

Each component must have its full functionality covered in unit tests.

These tests run in the browser to support unit tests for components that measure DOM elements.

### Component driver

**component.driver.ts**

All component drivers in this library should be built on top of [Unidriver](https://github.com/wix-incubator/unidriver). This enables end-to-end and unit test scenarios for the component.

The component driver is a tool for the component end user and should be built for the needs of that end user.

For example, when testing an application containing a drop down, the developer needs the `setSelectedIdx` API. This API method should click the dropdown open, find an item using its index, and click it. 

```tsx
import styles from './dropdown.st.css';

const DropDownDriver = (container: UniDriver) => {
	return {
		async setSelectedIdx(idx: number) {
			await container.$(styles.root).click();
			await container.$$(styles.item).get(idx).click();
		}
	};
};
```

By providing a single method which causes a chain of actions, rather than separate `open()` and `clickIdx()` methods, we reduce development efforts when testing applications that contain the component.

The component tests must provide full test coverage for the component driver.
With that in mind, avoid implementing "test helpers" in the driver since the driver is to be consumed externally and its API should remain constant and minimal.

### Component meta.ts
**component.meta.ts**

Component meta files add metadata to the component. This metadata is consumed by various tools from the [auto-tools](https://github.com/wix-incubator/ui-autotools) repo.

This enables you to run sanity tests for all components, create a documentation site, and create a good dev environment.

The meta file should provide prop simulations for the component.
```ts
import Registry from 'ui-autotools';
import {Button} from './button';
Registry.getComponentMetadata(Button)
  .addSim({
    props: {
      children: ['🧒', '👶', '🐊']
    }
  })
  .addSim({
    props: {
      children: ['🧒', '👶', '🐊']
    }
  });
```
The meta files should also provide state simulations, used in a snapshotting tool, enabling you to make sure no style variant of the component changes as a result of a change in the component.

```ts
import Registry from 'ui-autotools';
import {DropDown} from './drop-down';
Registry.getComponentMetadata(DropDown)
  .addStateSim("open",(props)=>{
      return {open:true}
  })
  .addStateSim("focusedItem",(props)=>{
      //In this use case the state simulation is derived from the props.
      // If the method returns undefined, the simulation is not tested with these props
      if(props.items && props.items.length){
          return {
              open:true,
              focused: Math.round(props.items.length/2)
          }
      }
  });
```

## Contributing component style variants

Style variants define a look for a specific component.

Becuse our themes are used in many different environemts, the writing guidelines differ between themes.

### ADI and Backoffice

All styles should be indexed according to the respective design system.

Style variants should be created (sometimes many in a single file)in a folder with the component name, under the respective theme.

For example:
**themes/adi/button/button.st.css**
```css
:import{
    -st-from:'../../../components/button/buttons.st.css';
    -st-defualt:Button
}

.largeBtn{
    -st-extends: Button;
    color:red;
    <!- exact stylable sytax TBD -->
    -meta-indexing:5.2;
}
```

All styles should be exported for easy use from their respective theme file.


**themes/adi/theme.st.css**
```css
:import{
    -st-from:'./button/button.st.css';
    -st-named:largeButton, smallButton;
}

.largeButton{}

.smallButton{}
```


### Studio

Style variants should be created, one per file, in a folder with the component name, under the **studio** folder.

All variants should be exported as `main`.

For example:

**themes/studio/button/button-3d.st.css**
```css
:import{
    -st-from:'../../../components/button/buttons.st.css';
    -st-defualt:Button
}

.main{
    -st-extends: Button;
    color:red;
}
```
