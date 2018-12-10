import { TabSection, SectionType } from '../typings/story-section';

export const isTab: ((StorySection) => boolean) = ({ type }) =>
  (type as SectionType) === SectionType.Tab;

export const extractTabs = (section: TabSection): string[]  =>
  section.sections.reduce(
    (tabs, tabSection) =>
      tabs.concat(isTab(tabSection) ? [tabSection.title as SectionType] : []),
    [],
  );
