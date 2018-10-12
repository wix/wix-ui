import React from 'react';
import styleclass from '../CodeShowcase.st.css';
import {node} from 'prop-types';

const List = ({children}) => (
  <div className={styleclass.demoItems}>
    {Array.isArray(children) ?
      children.map((child, index) => (
        <div key={index} style={{marginRight: '8px', marginBottom: '12px'}}>
          {child}
        </div>
      )) :
      children}
  </div>
);

List.propTypes = {
  children: node
};

export default List;
