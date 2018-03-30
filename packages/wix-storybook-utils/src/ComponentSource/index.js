import React from 'react';
import PropTypes from 'prop-types';
import jsxToString from 'jsx-to-string';
import CodeBlock from '../CodeBlock';

/**
  * given react component, render a soure example
  */
const ComponentSource = ({component, displayName}) =>
  <CodeBlock
    source={jsxToString(component, {
      displayName,
      useFunctionCode: true,
      functionNameOnly: false,
      shortBooleanSyntax: true,
      keyValueOverride: {
        ...(component.props.value && component.props.value._isAMomentObject ?
          {value: `'${component.props.value.format(component.props.dateFormat || 'YYYY/MM/DD')}'`} :
          {}
        )
      }
    })}
    />;

ComponentSource.propTypes = {
  component: PropTypes.node.isRequired,
  displayName: PropTypes.string
};

export default ComponentSource;
