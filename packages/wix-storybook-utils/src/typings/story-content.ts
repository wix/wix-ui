import { Example } from './example';

export interface StoryContent {
  description: string;
  do: string[];
  dont: string[];
  featureExamples: Example[];
  commonUseCaseExamples: Example[];
}
