import React, {Component} from 'react';
import PropTypes from 'prop-types';
import jsxToString from 'jsx-to-string';
import styles from './styles.scss';
import componentParser from '../AutoDocs/parser';

import {
  Wrapper,
  Options,
  Option,
  Preview,
  Code,
  Toggle,
  Input,
  List,
  NodesList
} from '../FormComponents';

const stripQuotes = string => {
  const quoted = string.match(/^['"](.*?)['"]$/);
  return quoted ? quoted[1] : string;
};

/**
  * Create a playground for some component, which is suitable for storybook. Given raw `source`, component reference
  * and, optionally, `componentProps`,`AutoExample` will render:
  *
  * * list of all available props with toggles or input fields to control them (with `defaultProps` values applied)
  * * live preview of `component`
  * * live code example
  *
  *
  * ### Example:
  *
  * ```js
  * import AutoExample from 'stories/utils/Components/AutoExample';
  * import component from 'wix-style-react/MyComponent';
  * import source from '!raw-loader!wix-style-react/MyComponent/MyComponent'; // raw string, not something like `export {default} from './MyComponent.js';`
  *
  * <AutoExample
  *   source={source}
  *   component={component}
  *   componentProps={{
  *     value: 'some default value',
  *     onClick: () => console.log('some handler')
  *   }}
  * />
  * ```
  */
export default class extends Component {
  static displayName = 'AutoExample';

  static propTypes = {
    /**
      * raw string of component source.
      *
      * uses `AutoDocs` under the hood. Read doc covering `AutoDocs` to learn more.
      *
      * Easiest is to `import source from '!raw-loader!my-component'`.
      *
      * Ensure there is only one component exported per file and the syntax is correct.
      *
      * Supported are both, functional and class components.
      * class components must have `render()` method. If you `extend` class and don't have `render()`, reconsider such
      * approach
      *
      */
    source: PropTypes.string.isRequired,

    /**
     * parsed meta object about component.
     *
     * Generated by `ComponentMetaInfoGetter` (uses `react-docgen` under the hood). Read doc covering `react-docgen` to learn more.
     *
     * Will exists in case if `ComponentMetaInfoGetter` will parse the source.
     *
     * Otherwise is't necessary to parse it manually.
     *
     */
    parsedSource: PropTypes.object,

    /**
      * reference to react component
      *
      * this is the usual `import component from 'my-component'`
      */
    component: PropTypes.func.isRequired,

    /**
      * control default props and their state of component in preview.
      *
      * can be either `object` or `function`:
      *
      * * `object` - simple javascript object which reflects `component` properties.
      * * `function` - `(setProps, getProps) => props`
      *      receives `setProps` setter and `getProps` getter. can be used to persist props state and react to event
      *      handlers and must return an object which will be used as new props. For example:
      *
      * ```js
      * <AutoExample
      *   component={ToggleSwitch}
      *   componentProps={(setProps, getProps) => ({
      *     checked: false,
      *     onChange: () => setProps({ checked: !getProps().checked })
      *   })}
      * ```
      */
    componentProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    exampleProps: PropTypes.object,

    /**
      * when true, display only component preview without interactive props nor code example
      */
    isInteractive: PropTypes.bool
  }

  static defaultProps = {
    source: '',
    component: () => null,
    componentProps: {},
    exampleProps: {},
    isInteractive: true
  }

  _initialPropsState = {};

  constructor(props) {
    super(props);

    this.parsedComponent = props.parsedSource || componentParser(this.props.source);

    this.state = {
      propsState: {
        ...(this.props.component.defaultProps || {}),
        ...(this.prepareComponentProps(this.props.componentProps))
      },
      funcValues: {},
      funcAnimate: {},
      isRtl: false,
      isDarkBackground: false
    };

    this._initialPropsState = this.state.propsState;
  }

  resetState = () =>
    this.setState({propsState: this._initialPropsState});

  componentWillReceiveProps(nextProps) {
    this.setState({
      propsState: {...this.state.propsState, ...this.prepareComponentProps(nextProps.componentProps)}
    });
  }

  prepareComponentProps = props =>
    typeof props === 'function' ?
      props(
        // setState
        componentProps =>
          this.setState({
            propsState: {...this.state.propsState, ...componentProps}
          }),

        // getState
        () => this.state.propsState || {}
      ) :
      props;


  mapControllableProps = fn => {
    return Object
      .keys(this.parsedComponent.props)
      .filter(key => Object.keys(this.controllableComponentGetters).includes(this.parsedComponent.props[key].type.name))
      .map(key => fn(this.parsedComponent.props[key], key));
  };

  setProp = (key, value) =>
    this.setState({propsState: {...this.state.propsState, [key]: value}});

  nodePropController = ({propKey}) =>
    this.props.exampleProps[propKey] ?
      <NodesList values={this.props.exampleProps[propKey]}/> :
      <Input/>;

  controllableComponentGetters = {
    string: () => <Input/>,
    number: () => <Input/>,
    bool: () => <Toggle/>,

    enum: ({type}) =>
      <List values={type.value.map(({value}) => stripQuotes(value))}/>,

    ReactNode: this.nodePropController,
    node: this.nodePropController,

    func: ({propKey}) => {
      let classNames = styles.example;
      if (this.state.funcAnimate[propKey]) {
        classNames += ` ${styles.active}`;
        setTimeout(() => this.setState({funcAnimate: {...this.state.funcAnimate, [propKey]: false}}), 2000);
      }

      if (this.props.exampleProps[propKey]) {
        return <div className={classNames}>{this.state.funcValues[propKey] || 'Interaction preview'}</div>;
      }
    },

    union: ({propKey}) =>
      this.props.exampleProps[propKey] ?
        <NodesList values={this.props.exampleProps[propKey]}/> :
        <Input/>,

    arrayOf: ({propKey}) => {
      if (this.props.exampleProps[propKey]) {
        return <NodesList values={this.props.exampleProps[propKey]}/>;
      }
    }
  }

  getPropControlComponent = (propKey, type) => {
    return (this.controllableComponentGetters[type.name] || (() => null))({propKey, type});
  }

  componentToString = component =>
    jsxToString(component, {
      useFunctionCode: true,
      functionNameOnly: false,
      shortBooleanSyntax: true,
      keyValueOverride: {
        ...(component.props.value && component.props.value._isAMomentObject ?
          {value: `'${component.props.value.format(component.props.dateFormat || 'YYYY/MM/DD')}'`} :
          {}
        )
      }
    })

  render() {
    const component = this.props.component;

    const functionExampleProps = Object.keys(this.props.exampleProps).filter(
      prop =>
        this.parsedComponent.props[prop] &&
        this.parsedComponent.props[prop].type.name === 'func'
    );

    const componentProps = {
      ...this.state.propsState,
      ...(
        functionExampleProps
          .reduce((acc, prop) => {
            acc[prop] = (...rest) => {
              if (this.state.propsState[prop]) {
                this.state.propsState[prop](...rest);
              }
              this.setState({
                funcValues: {...this.state.funcValues, [prop]: this.props.exampleProps[prop](...rest)},
                funcAnimate: {...this.state.funcAnimate, [prop]: true}
              });
            };
            return acc;
          }, {})
      )
    };

    const codeProps = {
      ...this.state.propsState,
      ...(
        functionExampleProps
          .reduce((acc, key) => {
            acc[key] = this.props.exampleProps[key];
            return acc;
          }, {})
      )
    };

    if (!this.props.isInteractive) {
      return React.createElement(component, componentProps);
    }

    return (
      <Wrapper dataHook="auto-example">
        <Options>
          { this.mapControllableProps((prop, key) =>
            <Option
              {...{
                key,
                label: key,
                value: componentProps[key],
                onChange: value => this.setProp(key, value),
                children: this.getPropControlComponent(key, prop.type)
              }}
              />
          ) }
        </Options>

        <Preview
          isRtl={this.state.isRtl}
          isDarkBackground={this.state.isDarkBackground}
          onToggleRtl={isRtl => this.setState({isRtl})}
          onToggleBackground={isDarkBackground => this.setState({isDarkBackground})}
          >
          {React.createElement(component, componentProps)}
        </Preview>

        <Code source={this.componentToString(React.createElement(component, codeProps))}/>
      </Wrapper>
    );
  }
}
