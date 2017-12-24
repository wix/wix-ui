import onClickOutside from 'react-onclickoutside';
const hoistNonReactStatics = require('hoist-non-react-statics');

const onClickOutsideHOC = Component => hoistNonReactStatics(onClickOutside(Component), Component, {inner: true});
export default onClickOutsideHOC;
