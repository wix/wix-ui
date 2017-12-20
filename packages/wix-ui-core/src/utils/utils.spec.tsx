import * as React from 'react';
import {buildChildrenObject, generateDefaultComponent} from './index';

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
      const Component = generateDefaultComponent(displayName);
      const children = <Component><div/></Component>;
      const childrenObject = buildChildrenObject(children, {});

      expect(childrenObject[displayName].type.displayName).toEqual(displayName);
    });

    it('should return a children object when rendered with component with namespace', () => {
      const displayName = 'a.b.c.b.componentName';
      const displayNameWithoutNamespace = 'componentName';
      const Component = generateDefaultComponent(displayName);
      const children = <Component><div/></Component>;
      const childrenObject = buildChildrenObject(children, {});

      expect(childrenObject[displayNameWithoutNamespace].type.displayName).toEqual(displayName);
    });

    it('should return a children object when rendered with multitple component', () => {
      const firstComponentDisplayName = 'a.b.c.b.firstComponentName';
      const firstComponentDisplayNameWithoutNamespace = 'firstComponentName';
      const FirstComponent = generateDefaultComponent(firstComponentDisplayName);

      const secondComponentDisplayName = 'a.b.c.b.secondComponentName';
      const secondComponentDisplayNameWithoutNamespace = 'secondComponentName';
      const SecondComponent = generateDefaultComponent(secondComponentDisplayName);

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

  describe('generateDefaultComponent', () => {
    it('should generate stateless component', () => {
      const displayName = 'componentName';
      const component = generateDefaultComponent(displayName);
      expect(component.displayName).toEqual(displayName);
    });

    it('should return element children when called', () => {
      const displayName = 'componentName';
      const component = generateDefaultComponent(displayName);
      const props = {
        children: {
          prop: 'value'
        }
      };
      expect(component(props)).toEqual(props.children);
    });
   });
});
