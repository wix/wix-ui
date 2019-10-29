import * as React from 'react';

function isReactClassComponent(value: any): value is React.ComponentClass<any> {
  return value && isComponentInstance(value.prototype);
}

function isComponentInstance(value: any): value is React.Component {
  return value && value instanceof React.Component;
}

function withStylableStateful<CoreProps, ExtendedProps = {}>(
  Component: React.ComponentClass<CoreProps>,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any, s?: any, c?: any) => StateMap,
  extendedDefaultProps: object,
): React.ComponentClass<CoreProps & ExtendedProps> {
  return class StylableComponent extends Component
    implements React.PureComponent<CoreProps & ExtendedProps> {
    static defaultProps = Object.assign(
      {},
      Component.defaultProps,
      extendedDefaultProps,
    );

    public props: Readonly<CoreProps & ExtendedProps>;

    render() {
      const root = super.render() as React.ReactElement;
      if (!root) {
        return null;
      }
      const className = (root.props && root.props.className) || '';
      /* tslint:disable-next-line:deprecation */
      const statesMap = getState(this.props, this.state, this.context);
      const props = stylesheet(
        `root ${className ? className : ''}`.trim(),
        statesMap,
      );
      return React.cloneElement(root, props);
    }
  } as any;
}

function withStylableStateless<CoreProps, ExtendedProps = {}>(
  Component: React.FunctionComponent<CoreProps>,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any) => StateMap,
  extendedDefaultProps: object,
): React.FunctionComponent<CoreProps & ExtendedProps> {
  const WrapperComponent: React.FunctionComponent<CoreProps & ExtendedProps> = (
    props: CoreProps & ExtendedProps,
  ) => {
    const root = Component(props);
    if (!root) {
      return null;
    }
    const className = (root.props && root.props.className) || '';
    const statesMap = getState(props);
    const stylableProps = stylesheet(
      `root ${className ? className : ''}`.trim(),
      statesMap,
    );
    return React.cloneElement(root, stylableProps);
  };

  // Copy static properties
  for (const propName in Component) {
    WrapperComponent[propName] = Component[propName];
  }

  WrapperComponent.defaultProps = Object.assign(
    {},
    Component.defaultProps,
    extendedDefaultProps,
  );
  return WrapperComponent;
}

export function withStylable<CoreProps, ExtendedProps = {}>(
  Component: React.ComponentClass<CoreProps>,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any, s?: any, c?: any) => StateMap,
  extendedDefaultProps?: object,
): React.ComponentClass<CoreProps & ExtendedProps>;

export function withStylable<CoreProps, ExtendedProps = {}>(
  Component: React.FunctionComponent<CoreProps>,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any) => StateMap,
  extendedDefaultProps?: object,
): React.FunctionComponent<CoreProps & ExtendedProps>;

export function withStylable<CoreProps, ExtendedProps = {}>(
  Component:
    | React.ComponentClass<CoreProps>
    | React.FunctionComponent<CoreProps>,
  stylesheet: RuntimeStylesheet,
  getState: (p?: any, s?: any, c?: any) => StateMap = () => ({}),
  extendedDefaultProps: object = {},
):
  | React.ComponentClass<CoreProps & ExtendedProps>
  | React.FunctionComponent<CoreProps & ExtendedProps> {
  if (isReactClassComponent(Component)) {
    return withStylableStateful<CoreProps, ExtendedProps>(
      Component as React.ComponentClass<CoreProps>,
      stylesheet,
      getState,
      extendedDefaultProps,
    );
  }
  return withStylableStateless<CoreProps, ExtendedProps>(
    Component as React.FunctionComponent<CoreProps>,
    stylesheet,
    getState,
    extendedDefaultProps,
  );
}
