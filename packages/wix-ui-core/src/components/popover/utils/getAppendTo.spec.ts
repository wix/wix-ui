import { getAppendTo } from './getAppendTo';

describe('getAppendTo', () => {
  it('should return document.body [when] given `viewport` ', () => {
    expect(getAppendTo('viewport')).toBe(document.body);
  });

  it('should return document.body [when] given `window` ', () => {
    expect(getAppendTo('window')).toBe(document.body);
  });

  it('should return first element with overflow style  [when] given `scrollParent` ', () => {
    const parent = document.createElement('div');
    const node = document.createElement('div');
    parent.appendChild(node);
    parent.style.overflow = 'auto';
    document.body.appendChild(parent);
    expect(getAppendTo('scrollParent', node)).toBe(parent);
  });

  it('should return null [when] given `random`', () => {
    expect(getAppendTo('random')).toBe(null);
  });
});
