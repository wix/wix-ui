# wix-ui-core
The wix-ui-core library is a one-stop-shop for reusable UI components. Components can be simple, like button, checkbox, input, or they can be a more complex composition of components, like a dropdown selection list, tooltip, video player, and much more.
 

The code for the components is written in TypeScript for better typing and interfaces.
All components are thoroughly tested and expose a test driver which can be used by the consumers of the component.

Components should have some minimal styling, which can be extended easily. The selected tool we use to apply styling and theming is [Stylable](https://stylable.io/).


## Stylable 
[Stylable](https://stylable.io/) is a CSS preprocessor that enables you to write style rules in CSS syntax and helps you to easily create themable components. The wix-ui-core components use Stylable for CSS styling in a way that allows the styling to be easily extended or overridden

with stylable you're able to:
- Extend CSS so that it is easier to use in a component ecosystem, but without losing any of the declarative, familiar, static and fast aspects of CSS.

- Create CSS Macros with JavaScript and use them at build time.

- Use language services like Code Completion and Validation. Each component exposes a Style API that maps its internal parts and states.

- Provide the ability to see our errors at build time or even while working in our IDE.

At build time, the preprocessor converts the Stylable CSS into flat, static, valid, vanilla CSS that works cross-browser.
