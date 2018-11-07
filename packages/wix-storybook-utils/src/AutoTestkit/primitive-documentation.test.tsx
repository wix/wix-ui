import { createPrimitiveDocumentationDriver } from './drivers';

describe('PrimitiveDocumentation', () => {
  const driver = createPrimitiveDocumentationDriver();
  const unit = {
    description: 'some description',
    name: 'wrapper',
  };

  beforeEach(() => {
    driver.create({ unit });
  });

  it('has primitives` name', () => {
    expect(driver.get.name()).toBe(unit.name);
  });

  it('has primitives` description', () => {
    expect(driver.get.description()).toBe(unit.description);
  });

  it('has name with tag td', () => {
    expect(driver.get.tag('name')).toBe('td');
  });

  it('has description with tag td', () => {
    expect(driver.get.tag('description')).toBe('td');
  });
});
