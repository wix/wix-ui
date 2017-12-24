import onClickOutside from 'react-onclickoutside';
const hoistNonReactStatics = require('hoist-non-react-statics');

export default Component => hoistNonReactStatics(onClickOutside(Component), Component, {inner: true});
