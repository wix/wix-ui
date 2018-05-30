import * as React from 'react';
import {
  buildChildrenObject,
  createComponentThatRendersItsChildren,
} from './';

import {
  attachStylesToNode,
  detachStylesFromNode
} from './stylableUtils';

describe('Utils', () => {
  describe('buildChildrenObject', () => {
    it('should return an empty object when called with null children and null initial object', () => {
      const children = null;
      const initialObject = null;
      const childrenObject = buildChildrenObject(children, initialObject);
      expect(childrenObject).toEqual({});
    });

    it('should return an empty object when called with one child without display name', () => {
      const children = <div/>;
      const childrenObject = buildChildrenObject(children, {});
      expect(childrenObject).toEqual({});
    });

    it('should return a children object when rendered with component', () => {
      const displayName = 'componentName';
      const Component = createComponentThatRendersItsChildren(displayName);
      const children = (
        <Component>
          <div/>
        </Component>
      );
      const childrenObject = buildChildrenObject(children, {});

      expect(childrenObject[displayName].type.displayName).toEqual(displayName);
    });

    it('should return a children object when rendered with component with namespace', () => {
      const displayName = 'a.b.c.b.componentName';
      const displayNameWithoutNamespace = 'componentName';
      const Component = createComponentThatRendersItsChildren(displayName);
      const children = (
        <Component>
          <div/>
        </Component>
      );
      const childrenObject = buildChildrenObject(children, {});

      expect(childrenObject[displayNameWithoutNamespace].type.displayName).toEqual(displayName);
    });

    it('should return a children object when rendered with multitple component', () => {
      const firstComponentDisplayName = 'a.b.c.b.firstComponentName';
      const firstComponentDisplayNameWithoutNamespace = 'firstComponentName';
      const FirstComponent = createComponentThatRendersItsChildren(firstComponentDisplayName);

      const secondComponentDisplayName = 'a.b.c.b.secondComponentName';
      const secondComponentDisplayNameWithoutNamespace = 'secondComponentName';
      const SecondComponent = createComponentThatRendersItsChildren(secondComponentDisplayName);

      const children = [];
      children.push(<FirstComponent><div/></FirstComponent>);
      children.push(<SecondComponent><div/></SecondComponent>);

      const childrenObject = buildChildrenObject(children, {});

      expect(childrenObject[firstComponentDisplayNameWithoutNamespace].type.displayName)
        .toEqual(firstComponentDisplayName);
      expect(childrenObject[secondComponentDisplayNameWithoutNamespace].type.displayName)
        .toEqual(secondComponentDisplayName);
    });
  });

  describe('createComponentThatRendersItsChildren', () => {
    it('should generate stateless component', () => {
      const displayName = 'componentName';
      const component = createComponentThatRendersItsChildren(displayName);
      expect(component.displayName).toEqual(displayName);
    });

    it('should return element children when called', () => {
      const displayName = 'componentName';
      const component = createComponentThatRendersItsChildren(displayName);
      const props = {children: {prop: 'value'}};
      expect(component(props)).toEqual(props.children);
    });
  });

  describe('node styles attachment', () => {
    const attributeName = 'data-att';
    const classA = 'CN';
    const classB = 'NC';
    let node;
    let stylesObj;

    beforeEach(() => {
      node = document.createElement('div');
      stylesObj = {
        className: classA,
        [attributeName]: 'ribute'
      };
    });

    describe('attach', () => {
      it('should attach styles to node', () => {
        attachStylesToNode(node, stylesObj);
        expect(node.classList.contains(stylesObj.className)).toBeTruthy();
        expect(node.getAttribute(attributeName)).toBe(stylesObj[attributeName]);
      });

      it('should attach more than one classname', () => {
        stylesObj.className += ` ${classB}`;
        attachStylesToNode(node, stylesObj);
        expect(node.classList.contains(classA)).toBeTruthy();
        expect(node.classList.contains(classB)).toBeTruthy();
      });
    });

    describe('remove', () => {
      it('should remove styles from node', () => {
        node.className = stylesObj.className;
        node.setAttribute(attributeName, stylesObj[attributeName]);

        detachStylesFromNode(node, stylesObj);
        expect(node.classList.contains(stylesObj.className)).toBeFalsy();
        expect(node.getAttribute(attributeName)).not.toBe(stylesObj[attributeName]);
      });

      it('should remove more than one classname', () => {
        stylesObj.className += ` ${classB}`;
        node.setAttribute(attributeName, stylesObj[attributeName]);

        detachStylesFromNode(node, stylesObj);
        expect(node.classList.contains(classA)).toBeFalsy();
        expect(node.classList.contains(classB)).toBeFalsy();
      });
    });
  });
});
