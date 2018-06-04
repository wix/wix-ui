import {queryHook, queryHookAll} from '../src/dom';

describe('Hook helpers', () => {
  it('finds elements with a given hook in a parent element', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <tree data-hook="inedible">
        <apple data-hook="edible"></apple>
        <leaf data-hook="inedible"></leaf>
      </div>
    `;

    expect(queryHook(div, 'edible')!.tagName).toBe('APPLE');
    expect(queryHook(div, 'inedible')!.tagName).toBe('TREE');

    expect(queryHookAll(div, 'inedible')[0].tagName).toBe('TREE');
    expect(queryHookAll(div, 'inedible')[1].tagName).toBe('LEAF');
  });

  it('matches element that has multiple hooks by one of them', () => {
    const div = document.createElement('div');
    div.innerHTML = '<div data-hook="first second third"></div>';

    expect(queryHook(div, 'second')).toBeTruthy();
  });

  it(`doesn't match given only a substring of the hook name`, () => {
    const div = document.createElement('div');
    div.innerHTML = '<div data-hook="awesome-hook"></div>';

    expect(queryHook(div, 'awesome')).toBeNull();
  });
});
