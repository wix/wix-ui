import {
  StorySection,
  TabSection,
  SectionType,
} from '../typings/story-section';

export const isTab: ((StorySection) => boolean) = ({ type }) =>
  (type as SectionType) === SectionType.Tab;

export function extractTabs(section: TabSection): string[] {
  return section.sections.reduce((tabs, tabSection) => {
    const extractTab = ({ type }: StorySection): SectionType[] =>
      isTab(tabSection) ? [tabSection.title as SectionType] : [];

    return tabs.concat(extractTab(tabSection));
  }, []);
}
