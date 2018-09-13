import * as React from 'react';
import Downshift from 'downshift';

export interface SelectProps {
  children?: React.ReactNode;
}

export class Select extends React.PureComponent<SelectProps> {
  render() {
    return (
      <Downshift>
        {({isOpen, toggleMenu}) => (
          <div>
            <button onClick={() => toggleMenu()}>menu</button>
            {isOpen && this.props.children}
          </div>
        )}
      </Downshift>
    );
  }
}
