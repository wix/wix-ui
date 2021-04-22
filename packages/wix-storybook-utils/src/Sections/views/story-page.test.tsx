import { createStoryBuilder } from './story-page.driver';

describe('StoryPage', () => {
  it('should render simple storyPage', () => {
    const { input, output } = createStoryBuilder();
    expect(input).toBe(output);
  });

  it('given feature example should render it', () => {
    const { input, output } = createStoryBuilder()
      .addExamples({ _random: '</div>' })
      .addFeatureExample({
        title: 'title',
        description: 'description',
        example: '_random',
      });

    expect(input).toBe(output);
  });

  it('given feature example without code example should not render it', () => {
    const { input, output } = createStoryBuilder().addFeatureExample({
      title: 'title',
      description: 'description',
      example: '_random',
    });

    expect(input).toBe(output);
  });

  it('given feature example as empty', () => {
    const { input, output } = createStoryBuilder().addFeatureExample([]);
    expect(input).toBe(output);
  });

  it('given common use case example', () => {
    const { input, output } = createStoryBuilder()
      .addExamples({ _random: '</div>' })
      .addCommonUseCasesExample({
        title: 'title',
        description: 'description',
        example: '_random',
      });
    expect(input).toBe(output);
  });

  it('given common use case example as empty should not render it', () => {
    const { input, output } = createStoryBuilder().addCommonUseCasesExample([]);
    expect(input).toBe(output);
  });

  it('given description should render it', () => {
    const { input, output } = createStoryBuilder().addDescription('Hello');
    expect(input).toBe(output);
  });

  it('given dodont should render it', () => {
    const { input, output } = createStoryBuilder().addDoDont({
      do: ['one'],
      dont: ['two'],
    });
    expect(input).toBe(output);
  });

  it('given dodont as empty arrays should not render it', () => {
    const { input, output } = createStoryBuilder().addDoDont({
      do: [],
      dont: [],
    });
    expect(input).toBe(output);
  });
});

