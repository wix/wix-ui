import * as React from 'react';
import { DoDontSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { DoDont } from '../../DoDont';

export const doDont = (props: DoDontSection, storyConfig: StoryConfig) => (
  <DoDont do={props.do} dont={props.dont} />
);
