import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Works with our Mocha test runner which has a #root element specifically
// for use in tests.
export function createDOMContainer(): HTMLElement {
  const container = document.createElement('div');
  document.getElementById('root').appendChild(container);
  return container;
}

// A wrapper around createDOMContainer to reduce boilerplate when working with
// React components.
export class ReactDOMTestContainer {
  public node: HTMLElement;

  public get componentNode(): HTMLElement | null {
    return this.node.firstElementChild as HTMLElement;
  }

  // Don't implicitly create the node during instantiation because it usually
  // happens outside of the before test hook.
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

  // This function signature should be:
  // <P, T extends React.Component<P>>(jsx: React.ComponentElement<P, T>): Promise<T>;
  // But TypeScript has this weird bug where it can derive the instance type from
  // React.createElement(Component), but cannot derive it from <Component />.
  public renderWithRef(jsx: JSX.Element): Promise<any> {
    let ref: any;
    jsx = React.cloneElement(jsx, {ref: r => ref = r});
    return this.render(jsx).then(() => ref);
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
}
