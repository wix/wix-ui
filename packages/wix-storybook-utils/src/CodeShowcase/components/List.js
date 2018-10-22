import React from 'react';
import styleclass from '../CodeShowcase.st.css';
import {node, bool} from 'prop-types';

const spacing = {marginRight: '8px', marginBottom: '8px', marginTop: '8px'};

const List = ({children, inverted}) => (
  <div {...styleclass('demoItems', {inverted})}>
    {Array.isArray(children) ?
      children.map((child, index) => (
        <div key={index} style={spacing}>
          {child}
        </div>
      )) :
      children}
  </div>
);

List.propTypes = {
  children: node,
  inverted: bool
};

List.defaultProps = {
  inverted: false
};

export default List;
