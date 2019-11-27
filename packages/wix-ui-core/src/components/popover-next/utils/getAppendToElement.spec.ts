import { getAppendToElement } from './getAppendToElement';
import { getScrollParent } from './utils';

describe('getAppendToElement', () => {
  it('should return document.body [when] given `viewport` ', () => {
    expect(getAppendToElement('viewport')).toBe(document.body);
  });

  it('should return document.body [when] given `window` ', () => {
    expect(getAppendToElement('window')).toBe(document.body);
  });

  it('should return first element with overflow style [when] given `scrollParent` ', () => {
    const node = document.createElement('div');
    const parent = document.createElement('div');
    parent.appendChild(node);
    parent.style.overflow = 'auto';
    expect(getAppendToElement('scrollParent', node)).toBe(
      getScrollParent(node),
    );
  });

  it('should return null [when] given `random`', () => {
    expect(getAppendToElement('random')).toBe(undefined);
  });

  it('should return matching ancestor by predicate [when] filter function', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';
    const element = document.createElement('div');
    const parent = document.createElement('div');
    parent.setAttribute('some-attr', 'some-value');
    parent.appendChild(element);
    expect(getAppendToElement(predicate, element)).toBe(parent);
  });

  it('should return undefined [when] predicate is not matched', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';
    const element = document.createElement('div');
    expect(getAppendToElement(predicate, element)).toBe(undefined);
  });

  it('should return given element [when] element is given', () => {
    const element = document.createElement('div');
    expect(getAppendToElement(element)).toBe(element);
  });
});
