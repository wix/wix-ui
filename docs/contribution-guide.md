# Contribution guide
wix-ui aims to be a one stop shop for all the components composing our products and our users sites.

we believe this library should be a group effort across all teams in wix. and would love to help anyone contibute.

## Ownership and contribiution process
Altough we want eveybody to contribute to this repo, we also believe we need to keep watch making sure that project quality and constitant API's are kept.


## Discussions
We aim to keep all project discussion inside GitHub issues. This is to make sure valuable discussion is accessible via search. If you have questions about how to use the library, or how the project is running - GitHub issues are the goto tool for this project.


## Best practices

since we want a lot of developers to work on this project together we believe all expected practices should be written, clear and enforced.

we hope to send many contributers to RTFM.


### general guidlines

- All logic must be written using strictly-typed TypeScript code.


#### Project structure

Files and folders will be kebab cased “my-button.tsx” as opposed to “myButton.tsx”. This solves an issue with git in windows ( git cares about casing, windows doesn’t)

@shachar -> i currently only did ui-core (according to what we discussed).


All component assets will be placed in the same folder as the component, except for style variants, these are located in  a folder structure replicating the components directories and located under the specific theme.

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
        

## Contributing components

components are great building blocks. but they're not the only ones we have.

before creating a new component please consider the option of just creating a new reusable style for an existing component or for an HTML element.

it's faster, and cheaper on your runtime

### Component Logic
**component.tsx**

All component APIs must be strongly typed, with `any` not accepted. it might be harder to write, but its much easier to use.

### Component Drivers
**component.driver.ts**

In the root you will find a drivers folder containing different index files(according to your testing platform).
These files are exports list for each component's driver export. If you are a component library developer trying to import drivers from wix-ui-core,
please use the drivers index file, for example - if you need the vanilla driver of **AddressInput** :

`export {addressInputDriverFactory} from 'wix-ui-core/drivers/vanilla';`

### Component Style API

**Component.st.css**

Component st.css files define the components style API.

a component importing the following stylable file:
```css
.btn1{

}

.btn2{

}

```

is exposing both the `btn1` class and `btn2` class to stylable so they can be customized.

Note that in the root path, there is an `index.st.css` file. It is an index file for all component's style exports.
If you are trying to import a style outside of wix-ui-core, please import it from this file - like here :

```css
:import {
    -st-from: "wix-ui-core/index.st.css";
    -st-named: AddressInput;
}

```

#### Essential rules only

while its tempting to add rules to a component's CSS. for it to be truly reusable and customizable its CSS should be as devoid of rules as possible.
adding only ones that are essential to the components functionality.
and leaving the rest to open customizations.

when working on a component, its always good to create a style variant of it for development processes

#### Expose the API

Unlike normal component properties, which result in runtime costs, CSS APIs have very little runtime cost.

you should always open up the API as much as possible, Put special attention to clear naming of CSS classes since these form the component's style API. Later changes in these could result in major version update.

##### Expose all meaningfull nodes

Even if your design use case does not need to customize a node. if you believe someone else might, create a class for it and expose it.

##### Define each class as well as possible

If this class is assigned to a component, specify this in its st.css.

```css
:import{
    -st-from: "../button/button.st.css";
    -st-default: Button;
}
.btn1{
  -st-extends:Button;
}
```

this will allow customization of the button internals on the `btn1` class

##### Add Stylable states

Stylable states are a way for a component do define its different visual states to stylable.

for instance, a drop down component might expose an "open" state, so it can be customized differently while open.

in a calander scenario, we might want many states for the day:

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

### Component Tests

**component.spec.tsx**

Each component must have its full functionality covered in unit tests.

these tests run in the browser. in order to support unit tests for components that measure dom elements.

### Component Driver

**component.driver.ts**

All component drivers in this library should be built on top of [Unidriver](https://github.com/wix-incubator/unidriver), this makes them fit well in E2E and Unit test scenarios

The component driver is a tool for the component end user. and should be built with that thought in mind.

For instance, when testing an application containing a drop down, all the API a developer needs is `setSelectedIdx`. this API method should click the dropdown open, find the provided item by index, and click it. 

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

the component tests must provide full test coverage for the component driver.
With that in mind, avoid implementing "test helpers" in the driver since the driver is to be consumed externally and its API should remain constant and minimal.

### component meta.ts

Component meta file adds additional information about the component - mainly the different variations of properties and style. This information is required by several automated tools that help us present and test the component, thus saving work for the developer. 

These tools include visual screenshot tests, accessibility tests, SSR rendering and additional sanity validations. Additionally the variations provided are used to automatically present the component's different looks in showcase / storybook. Make sure to add a simulation for each important variation of the component. 

Read more about these tools here: [ui-autotools](https://github.com/wix-incubator/ui-autotools)

Note: The automated tests DO NOT replace unit tests and don't simulate interactions (clicking, hovering, keyboard, etc.). 

Example of a meta file:
```ts

import Registry from 'ui-autotools';
import {Checkbox} from './checkbox';
const metaData = Registry.getComponentMetadata(Checkbox)

// `addSim` is used to define a new simulation for the component.
metaData.addSim({
    title: 'default - unchecked', 
    props: {
      name: 'myCheckbox'
    }
  })

// provide relevant props to make the component change visual states 
metaData.addSim({
    title: 'checked', 
    props: {
      name: 'myCheckbox',
      checked: true
    }
  });

// you can even override the component's state to simulate interactions (like focus for example)
metaData.addSim({
    title: 'checked and focused', 
    props: {
      name: 'myCheckbox',
      checked: true
    },
    state: {
      focusVisible: true,
      focus: true
    }
  }); 

// add as many different simulations as you can. These will be used to display the 
// different scenarios of the component and also to make sure it passes relevant 
// tests (SSR, A11Y, etc...)
metaData.addSim({
    title: 'unchecked and focused', 
    props: {
      name: 'myCheckbox',
    },
    state: {
      focusVisible: true,
      focus: true
    }
  });   
  

```

Notice that we allow overriding the component's **internal** React state to acheive visual looks that result from interactions (like focus, open dropdown and such...). For example:

```ts
import Registry from 'ui-autotools';
import {Dropdown} from './dropdown';
const metaData = Registry.getComponentMetadata(Dropdown)

metaData.addSim({
    title: 'Open with item1 focused and item3 selected', 
    props: {
      items: ['item1', 'item2', 'item3']
    },
    state: {
      open: true
      focusedItem: 'item1'
      selectedItem: 'item3'
    }
  }); 
```

## Contributing Component Style Variants.

Style variants define a look for a specific component.

becuse our themes are used in many different environemts the writing guidelines differ between themes.




### ADI and Backoffice


all styles should be indexed according to the respective design system.


style variants should be created ( sometimes many in a single file ) in a folder with the component name, under the respective theme.

i.e:

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

all styles should be exported for easy use from the respective theme file.


**themes/adi/theme.st.css**
```css
:import{
    -st-from:'./button/button.st.css';
    -st-named:largeButton, smallButton;
}

.largeBtn{}

.smallButton{}
```


### studio

style variants should be created ( one in a file ) in a folder with the component name, under the studio folder.

all variants should be exported as "main"

i.e:

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

## Links

- [Usage Guide](usage-guide.md)
- [Icons Future](icons-future.md)
- [Icons](icons.md)
- [What Are Themes](WHAT_ARE_THEMES.md)
- [Themes Structure](THEMES_STRUCTURE.md)
- [Component Spec Template](component-spec-template.md)
