import React from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import CodeBlock from '../CodeBlock';
import removeHOC from './remove-hoc';

import functionToString from './function-to-string';

const componentToJSX = component =>
  reactElementToJSXString(
    component,
    {
      displayName: element =>
        element.type.displayName ?
          removeHOC(element.type.displayName) :
          element.type.name || element.type,
      showDefaultProps: false,
      showFunctions: false,
      functionValue: functionToString
    }
  );

/**
  * given react component, render a source example
  */
const ComponentSource = ({component}) =>
  <CodeBlock
    dataHook="metadata-codeblock"
    source={componentToJSX(component)}
    />;

ComponentSource.propTypes = {
  component: PropTypes.node.isRequired
};

export default ComponentSource;
