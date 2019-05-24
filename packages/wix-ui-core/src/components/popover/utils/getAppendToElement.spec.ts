import { getAppendToElement } from './getAppendToElement';
import { getScrollParent } from 'popper.js/dist/umd/popper-utils';

describe('getAppendToElement', () => {
  it('should return document.body [when] given `viewport` ', () => {
    expect(getAppendToElement('viewport')).toBe(document.body);
  });

  it('should return document.body [when] given `window` ', () => {
    expect(getAppendToElement('window')).toBe(document.body);
  });

  it('should return first element with overflow style  [when] given `scrollParent` ', () => {
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

  it('should return null [when] predicate is not matched', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';
    const element = document.createElement('div');
    expect(getAppendToElement(predicate, element)).toBe(undefined);
  });

  it('should return sibling element [when] predicate is matched', () => {
    const predicate = el => el.getAttribute('some-attr') === 'some-value';

    const parent = document.createElement('div');
    const sibling1 = document.createElement('div');
    const sibling2 = document.createElement('div');
    parent.appendChild(sibling1);
    parent.appendChild(sibling2);
    sibling1.setAttribute('some-attr', 'some-value');
    expect(getAppendToElement(predicate, sibling2)).toBe(sibling1);
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
    expect(getAppendToElement(predicate, sibling1)).toBe(sibling2_1);
  });

  it('should return given element [when] element is given', () => {
    const element = document.createElement('div');
    expect(getAppendToElement(element)).toBe(element);
  });
});
