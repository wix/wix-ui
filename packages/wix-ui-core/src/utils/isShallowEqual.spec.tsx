import {isShallowEqual} from './isShallowEqual';

describe('isShallowEqual', () => {
  it('should be true for objects with same primitive keys', () => {
    isShallowEqual({a: 1}, {a: 1});
  });

  it('should be true for objects with same primitive keys(2)', () => {
    isShallowEqual({a: 1, b: 1}, {a: 1, b: 1});
  });

  it('should be true for complex objects with same links', () => {
    const key = { b: 1 };
    isShallowEqual({a: key}, {a: key});
  });

  it('should be true for empty objects', () => {
    isShallowEqual({}, {});
  });

  it('should be true for primitives', () => {
    isShallowEqual(1, 1);
  });

  it('should be false for complex objects', () => {
    isShallowEqual({a: {}}, {a: {}});
  });

  it('should be false for complex objects(2)', () => {
    isShallowEqual({a: { b: 1 }}, {a: {b: 1}});
  });
});
