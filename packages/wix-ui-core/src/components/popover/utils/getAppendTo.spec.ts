import { getAppendTo } from './getAppendTo';

describe('getAppendTo', () => {
  it('should return document.body [when] given `viewport` ', () => {
    expect(getAppendTo('viewport')).toBe(document.body);
  });

  it('should return document.body [when] given `window` ', () => {
    expect(getAppendTo('window')).toBe(document.body);
  });

  it('should return first element with overflow style  [when] given `scrollParent` ', () => {
    const node = document.createElement('div');
    const parent = document.createElement('div');
    parent.appendChild(node);
    parent.style.overflow = 'auto';
    document.body.appendChild(parent);
    expect(getAppendTo('scrollParent', node)).toBe(parent);
  });

  it('should return null [when] given `random`', () => {
    expect(getAppendTo('random')).toBe(null);
  });

  it('should return matching ancestor by predicate [when] filter function', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';
    const element = document.createElement('div');
    const parent = document.createElement('div');
    parent.setAttribute('some-attr', 'some-value');
    parent.appendChild(element);
    expect(getAppendTo(predicate, element)).toBe(parent);
  });

  it('should return document body [when] predicate is not matched', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';
    const element = document.createElement('div');
    expect(getAppendTo(predicate, element)).toBe(document.body);
  });

  it('should return sibling element [when] predicate is matched', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';

    const parent = document.createElement('div');
    const sibling1 = document.createElement('div');
    const sibling2 = document.createElement('div');
    parent.appendChild(sibling1);
    parent.appendChild(sibling2);
    sibling1.setAttribute('some-attr', 'some-value');
    expect(getAppendTo(predicate, sibling2)).toBe(sibling1);
  });

  it('should return sibling of siblings [when] predicate is matched', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';
    const parent = document.createElement('div');
    const sibling1 = document.createElement('div');
    const sibling2 = document.createElement('div');
    const sibling2_1 = document.createElement('div');
    parent.appendChild(sibling1);
    parent.appendChild(sibling2);
    sibling2.appendChild(sibling2_1);
    sibling2_1.setAttribute('some-attr', 'some-value');
    expect(getAppendTo(predicate, sibling1)).toBe(sibling2_1);
  });

  it('should return sibling of siblings [when] predicate is matched', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';

    const parent = document.createElement('div');
    const sibling1 = document.createElement('div');
    const sibling2 = document.createElement('div');
    const sibling2_1 = document.createElement('div');
    parent.appendChild(sibling1);
    parent.appendChild(sibling2);
    sibling2.appendChild(sibling2_1);
    sibling2_1.setAttribute('some-attr', 'some-value');
    expect(getAppendTo(predicate, sibling1)).toBe(sibling2_1);
  });

  it('should return given element [when] element is given', () => {
    const element = document.createElement('div');
    expect(getAppendTo(element)).toBe(element);
  });
});
