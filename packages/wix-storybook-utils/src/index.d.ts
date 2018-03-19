export interface StoryUrlParams {
    kind: string;
    story: string;
    withExamples?: boolean;
}

export function createStoryUrl(params: StoryUrlParams): string;
