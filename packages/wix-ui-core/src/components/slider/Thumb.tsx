import * as React from 'react';
import { style, classes } from './Slider.st.css';

export interface ThumbProps {
  shape: string;
  thumbPosition: React.CSSProperties;
  thumbSize: React.CSSProperties;
  onMouseEnter: any;
  onMouseLeave: any;
}

export class Thumb extends React.Component<ThumbProps> {
  render() {
    const { shape, thumbSize } = this.props;
    const ThumbShape = thumbShapes[shape];

    return (
      <div
        data-hook="thumb"
        className={classes.thumb}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={{
          ...this.props.thumbPosition,
          ...thumbSize,
        }}
      >
        <ThumbShape.component />
        {this.props.children}
      </div>
    );
  }
}

export function getThumbSize(shape: string, ...rest) {
  return thumbShapes[shape].getThumbSize(...rest);
}

class CircleThumb extends React.PureComponent<any> {
  render() {
    return (
      <div
        className={style(classes.thumbShape, { shapeType: 'circle' })}
        style={{ borderRadius: '50%' }}
      />
    );
  }
}

class RectangleThumb extends React.PureComponent<any> {
  render() {
    return (
      <div className={style(classes.thumbShape, { shapeType: 'rectangle' })} />
    );
  }
}

class SquareThumb extends React.PureComponent<any> {
  render() {
    return (
      <div className={style(classes.thumbShape, { shapeType: 'square' })} />
    );
  }
}

class BarThumb extends React.PureComponent<any> {
  render() {
    return <div className={style(classes.thumbShape, { shapeType: 'bar' })} />;
  }
}

const thumbShapes = {
  circle: {
    component: CircleThumb,
    getThumbSize: sliderSize => ({ width: sliderSize, height: sliderSize }),
  },
  rectangle: {
    component: RectangleThumb,
    getThumbSize: (sliderSize, isVertical) => ({
      [isVertical ? 'height' : 'width']: 1.5 * sliderSize,
      [isVertical ? 'width' : 'height']: sliderSize,
    }),
  },
  square: {
    component: SquareThumb,
    getThumbSize: sliderSize => ({ width: sliderSize, height: sliderSize }),
  },
  bar: {
    component: BarThumb,
    getThumbSize: (sliderSize, isVertical) => ({
      [isVertical ? 'height' : 'width']: 0.5 * sliderSize,
      [isVertical ? 'width' : 'height']: sliderSize,
    }),
  },
};
