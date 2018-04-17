import React from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import CodeBlock from '../CodeBlock';

import functionToString from './function-to-string';

const componentToJSX = ({component, displayName}) =>
  reactElementToJSXString(
    component,
    {
      displayName: () => displayName,
      showDefaultProps: false,
      showFunctions: false,
      functionValue: functionToString
    }
  );

/**
  * given react component, render a source example
  */
const ComponentSource = props =>
  <CodeBlock source={componentToJSX(props)}/>;

ComponentSource.propTypes = {
  component: PropTypes.node.isRequired,
  displayName: PropTypes.string
};

export default ComponentSource;
