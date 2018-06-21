import * as React from 'react';
import * as PropTypes from 'prop-types';

const arc = (r, value) => {
  value /= 100;
  const angle = 2 * Math.PI * (value - 1/4);
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  const sweep = Math.round(value);
  return `M .01 ${-r} A ${r} ${r} 0 ${sweep} 1 ${x} ${y}`;
}

export interface ArcProps {
  value: number;
  strokeWidth: number;
  size: number;
  className: string;
}

export const Arc: React.SFC<ArcProps> = (props: ArcProps) => {
  const {value, strokeWidth, size, className} = props;
  const viewBox = `${-size / 2} ${-size / 2} ${size} ${size}`;
  const d = arc((size - strokeWidth) / 2, value);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
    >
      <path d={d} strokeWidth={strokeWidth} />
    </svg>  
  );
}

Arc.propTypes = {
  value: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};

Arc.displayName = 'Arc';
