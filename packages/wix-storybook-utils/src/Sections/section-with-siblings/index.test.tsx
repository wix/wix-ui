import { mount } from 'enzyme';

import { sectionWithSiblings } from '.';
import { ImportExampleSection } from '../../typings/story-section';
import Markdown from '../../Markdown';

import * as sectionBuilders from '../';

describe('sectionWithSiblings', () => {
  ['title', 'header'].map(section => {
    it(`should not render siblings for ${section} section`, () => {
      const expectation = `${section} without siblings`;

      const rendered = mount(
        sectionWithSiblings(
          sectionBuilders[section]({
            pretitle: 'i',
            title: 'should',
            subtitle: 'not',
            description: 'show',
          }),
          expectation,
        ),
      );

      expect(rendered.text()).toEqual(expectation);
    });
  });

  describe('ImportExampleSection', () => {
    it('should have `Import` when `title` is undefined', () => {
      const source = 'best test code';
      const makeSection = (
        sectionConfig: Partial<ImportExampleSection> | string,
      ) =>
        mount(
          sectionWithSiblings(
            sectionBuilders.importExample(sectionConfig),
            'dummy content',
          ),
        );

      const withTitle = makeSection({ title: 'hey there', source });
      const withoutTitle = makeSection(
        sectionBuilders.importExample({ source }),
      );
      const withoutTitleShorthand = makeSection(source);

      // this also tests that Markdown is used!
      expect(withTitle.find(Markdown).prop('source')).toEqual('hey there');
      expect(withoutTitle.find(Markdown).prop('source')).toEqual('Import');
      expect(withoutTitleShorthand.find(Markdown).prop('source')).toEqual(
        'Import',
      );
    });
  });
});
