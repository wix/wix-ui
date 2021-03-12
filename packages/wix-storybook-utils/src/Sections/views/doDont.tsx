import * as React from 'react';
import { DoDontSection } from '../../typings/story-section';
import { DoDont } from '../../DoDont';

export const doDont: React.FC<DoDontSection> = props => (
  <DoDont do={props.do} dont={props.dont} />
);
