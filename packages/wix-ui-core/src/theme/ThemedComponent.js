import React from 'react';
import {func, node} from 'prop-types';
import pickBy from 'lodash/pickBy';

class ThemeGenerator extends React.PureComponent {
  static propTypes = {
    render: func.isRequired,
    themeCreator: func.isRequired
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line no-unused-vars
    const {render, themeCreator, ...propsForTheme} = props;
    this.state = {theme: themeCreator(propsForTheme)};
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-unused-vars
    const {render, themeCreator, ...propsForTheme} = nextProps;

    const changedProps = pickBy(propsForTheme, (value, key) => this.props[key] !== value);

    if (Object.keys(changedProps).length > 0) {
      this.setState({theme: themeCreator(propsForTheme)});
    }
  }

  render() {
    return this.props.render(this.state);
  }
}

export const ThemedComponent = ({children, themeCreator, ...propsForTheme}) => (
  <ThemeGenerator
    themeCreator={themeCreator}
    render={({theme}) => React.cloneElement(children, {theme})}
    {...propsForTheme}
    />
);

ThemedComponent.propTypes = {
  children: node,
  themeCreator: func
};

ThemedComponent.defaultProps = {
  children: null,
  themeCreator: () => {}
};

