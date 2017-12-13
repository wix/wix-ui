import React, {cloneElement, Component, Children} from 'react';
import PropTypes from 'prop-types';

import CodeExample from '../CodeExample';

export default class InteractiveCodeExample extends Component {

  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    autoExpand: PropTypes.bool
  }

  static defaultProps = {
    autoExpand: true
  }

  constructor(props) {
    super(props);

    this.state = {
      code: ''
    };

    this.onCodeChange = this.onCodeChange.bind(this);
  }

  onCodeChange(code) {
    if (code !== this.state.code) {
      this.setState({code});
    }
  }

  render() {
    const childrenWithOnChange = Children.map(this.props.children,
      child => cloneElement(child, {onChange: this.onCodeChange})
    );

    return (
      <CodeExample
        title={this.props.title}
        code={this.state.code}
        codeType="django"
        autoExpand={this.props.autoExpand}
        >
        {childrenWithOnChange}
      </CodeExample>
    );
  }

}
