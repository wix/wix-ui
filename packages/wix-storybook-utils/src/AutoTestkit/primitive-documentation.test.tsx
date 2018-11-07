import { PrimitiveDocumentationDriver } from './drivers';

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
