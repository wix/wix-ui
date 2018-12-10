import {
  StorySection,
  SectionType,
  SectionsMeta,
} from '../typings/story-section';

import { Metadata } from '../typings/metadata';

export const isTab: ((StorySection) => boolean) = ({ type }) =>
  (type as SectionType) === SectionType.Tab;

export function combineMeta(
  sections: StorySection[],
  metadata: Metadata,
): { sections: StorySection[]; metadata: SectionsMeta & Metadata } {
  return sections.reduce(
    (accumulator, section) => {
      const extractTab = ({ type }: StorySection): SectionType[] =>
        isTab(section) ? [section.title as SectionType] : [];

      return {
        metadata: {
          ...metadata,
          tabs: accumulator.metadata.tabs.concat(extractTab(section)),
        },
        sections: accumulator.sections.concat(section),
      };
    },
    { sections: [], metadata: { ...metadata, tabs: [] } },
  );
}
