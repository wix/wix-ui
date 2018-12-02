import {
  StorySection,
  SectionType,
  SectionsMeta,
} from '../typings/story-section';

const isTab: ((StorySection) => boolean) = ({ type }) =>
  (type as SectionType) === SectionType.Tab;

export function extractMeta(
  sections: StorySection[],
): { sections: StorySection[]; meta: SectionsMeta } {
  return sections.reduce(
    (accumulator, section) => {
      const extractTab = ({ type }: StorySection): SectionType[] =>
        isTab(section) ? [section.title as SectionType] : [];

      return {
        meta: { tabs: accumulator.meta.tabs.concat(extractTab(section)) },
        sections: accumulator.sections.concat(section),
      };
    },
    { sections: [], meta: { tabs: [] } },
  );
}
