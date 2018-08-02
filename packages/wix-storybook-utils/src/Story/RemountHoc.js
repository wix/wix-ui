import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
  state = {
    visible: true
  }
   static propTypes = {
     children: PropTypes.node
   }
   componentDidMount() {
     window.story = this;
   }
  remount = () =>
    new Promise(resolve =>
      this.setState({visible: false}, () =>
        this.setState({visible: true}, resolve)))
  render() {
    return this.state.visible ? this.props.children : null;
  }
}
