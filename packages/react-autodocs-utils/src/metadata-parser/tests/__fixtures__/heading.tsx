import * as React from 'react';

export type Appearance = 'H1' | 'H2' | 'H3' | 'H4' | 'H5';
export type Skin = 'dark' | 'light';

export interface Props {
  /** skin color of the heading */
  skin?: Skin;

  /** typography of the heading */
  appearance?: Appearance;
}

const defaultProps: Props = {
  appearance: 'H1',
  skin: 'dark',
};

export class Heading extends React.PureComponent<Props> {
  static defaultProps: Props = defaultProps;

  render() {
    return <div />;
  }
}
