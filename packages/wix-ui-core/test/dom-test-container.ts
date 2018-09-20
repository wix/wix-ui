import * as React from "react";
import * as ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { reactUniDriver, UniDriver } from "unidriver";

// At the moment our tests support both Jsdom and browser environment.
// The browser test runner provides #root element to render into, and
// in Jsdom we're going to add the container into the body.
export function createDOMContainer(): HTMLElement {
  const root = document.querySelector("#root") || document.body;
  const div = document.createElement("div");
  root.appendChild(div);
  return div;
}

// A wrapper around createDOMContainer to reduce boilerplate when working with
// React components.
export class ReactDOMTestContainer {
  public node: HTMLElement;

  public get componentNode(): HTMLElement | null {
    return this.node.firstElementChild as HTMLElement;
  }

  // The container is usually created outside of before() test hook, and the
  // constructor runs before any of the tests, globally. Instead of attaching
  // the DOM element upfront in the constructor and polluting the document we
  // provide this method.
  public create(): this {
    this.node = createDOMContainer();
    return this;
  }

  public destroy(): this {
    this.node.remove();
    return this;
  }

  // We're not returning the result of  ReactDOM.render() because its use
  // is deprecated.
  public render<P>(jsx: React.ReactElement<P>): Promise<void> {
    return new Promise(resolve => ReactDOM.render(jsx, this.node, resolve));
  }

  public renderSync<P>(jsx: React.ReactElement<P>) {
    return ReactDOM.render(jsx, this.node);
  }

  // This function's signature should be:
  // <P, T extends React.Component<P>>(jsx: React.ComponentElement<P, T>): Promise<T>;
  // But TypeScript has this weird bug where it can derive the instance type from
  // React.createElement(Component), but cannot derive it from <Component />.
  public renderWithRef(jsx: JSX.Element): Promise<any> {
    const ref = React.createRef();
    jsx = React.cloneElement(jsx, { ref });
    return this.render(jsx).then(() => ref.current);
  }

  public unmount(): this {
    ReactDOM.unmountComponentAtNode(this.node);
    return this;
  }

  public unmountAfterEachTest(): this {
    beforeAll(() => this.create());
    afterEach(() => this.unmount());
    afterAll(() => this.destroy());
    return this;
  }

  public destroyAfterEachTest(): this {
    beforeEach(() => this.create());
    afterEach(() => (this.unmount(), this.destroy()));
    return this;
  }

  // Adapter for drivers written for wix-ui-test-utils/createDriverFactory
  public createLegacyRenderer<T>(
    driverFactory: (args: LegacyDriverArgs) => T
  ): (element: JSX.Element) => T {
    return (jsx: JSX.Element) => {
      this.renderSync(jsx);
      return driverFactory({
        element: this.componentNode,
        wrapper: this.node,
        eventTrigger: Simulate
      });
    };
  }

  // Adapter for react based uni driver
  public createUniRenderer<T>(driverFactory: (base: UniDriver) => T): (element: JSX.Element) => T {
    return (jsx: JSX.Element) => {
      this.renderSync(jsx);
      const base = reactUniDriver(this.componentNode);
      return driverFactory(base);
    };
  }
}

export interface LegacyDriverArgs {
  element: Element | null;
  wrapper: HTMLElement;
  component?: JSX.Element;
  eventTrigger: typeof Simulate;
}
