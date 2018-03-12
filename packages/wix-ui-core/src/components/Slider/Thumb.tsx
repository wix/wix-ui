import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface ThumbProps {
  shape: string;
  thumbPosition: Object;
  thumbSize: number;
  onMouseEnter: any;
  onMouseLeave: any;
  classes: any;
}

export class Thumb extends React.Component<ThumbProps> {
  static propTypes = {
    shape: PropTypes.string.isRequired,
    thumbPosition: PropTypes.object.isRequired,
    thumbSize: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    classes: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {shape, classes} = this.props;
    const ThumbShape = thumbShapeMap[shape];

    return (
      <div data-hook="thumb"
        className={classes.thumb}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={{
          ...this.props.thumbPosition,
          width: this.props.thumbSize,
          height: this.props.thumbSize
        }}
      >
        {React.createElement(ThumbShape, {
            classes
        })}
        {this.props.children}
      </div>
    );
  }
}

class CircleThumb extends React.Component<any> {
  render() {
    return (
      <div className={this.props.classes.thumbShape} style={{borderRadius: '50%'}}/>
    );
  }
}

class SquareThumb extends React.Component {
  render() {
    return null;
  }
}

class RectThumb extends React.Component {
  render() {
    return null;
  }
}

class TriangleThumb extends React.Component {
  render() {
    return null;
  }
}

class DiamondThumb extends React.Component {
  render() {
    return null;
  }
}

const thumbShapeMap = {
  circle: CircleThumb,
  square: SquareThumb,
  rectangle: RectThumb,
  triangle: TriangleThumb,
  diamond: DiamondThumb
};
