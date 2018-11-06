import * as React from 'react';
import { mount } from 'enzyme';
import { ValueDocumentation } from './value-documentation';

export class ValueDocumentationDriver {
  component;
  when = {
    created: data => {
      this.component = mount(
        <table>
          <tbody>
            <ValueDocumentation data={data} />
          </tbody>
        </table>,
      );
      return this;
    },
  };
  given = component => {
    this.component = component;
    return this;
  };

  get = {
    name: () => this.component.find('[data-hook="auto-testkit-value"]').text(),
  };
}

describe('ValueDocumentation', () => {
  const driver = new ValueDocumentationDriver();
  it('has a name', () => {
    const valueData = {
      type: 'value',
      name: 'not-a-function',
    };
    driver.when.created(valueData);
    expect(driver.get.name()).toBe(valueData.name);
  });
});
