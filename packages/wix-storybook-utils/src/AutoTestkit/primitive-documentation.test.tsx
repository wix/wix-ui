import * as React from 'react';
import { mount } from 'enzyme';
import { PrimitiveDocumentation } from './primitive-documentation';

export class PrimitiveDocumentationDriver {
  private component;
  private select = hook =>
    this.component.find(`[data-hook="auto-testkit-primitive-${hook}"]`);

  when = {
    created: data => {
      this.component = mount(
        <table>
          <tbody>
            <PrimitiveDocumentation data={data} />
          </tbody>
        </table>,
      );
      return this;
    },
  };

  given = {
    component: component => {
      this.component = component;
      return this;
    },
  };

  get = {
    name: () => this.select('name').text(),
    description: () => this.select('description').text(),
    tag: hook => this.select(hook).name(),
  };
}

describe('PrimitiveDocumentation', () => {
  const data = {
    description: 'some description',
    name: 'wrapper',
  };
  const namespace = new PrimitiveDocumentationDriver().when.created(data);

  it('has primitives` name', () => {
    expect(namespace.get.name()).toBe(data.name);
  });

  it('has primitives` description', () => {
    expect(namespace.get.description()).toBe(data.description);
  });

  it('has name with tag td', () => {
    expect(namespace.get.tag('name')).toBe('td');
  });

  it('has description with tag td', () => {
    expect(namespace.get.tag('description')).toBe('td');
  });
});
