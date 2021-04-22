import { createStoryBuilder } from './story-page.driver';

describe('StoryPage', () => {
  it('should render simple storyPage', () => {
    const { input, output } = createStoryBuilder();
    expect(input).toBe(output);
  });

  it('should render story page with given feature example', () => {
    const { input, output } = createStoryBuilder().addFeatureExample({
      title: 'title',
      description: 'description',
      example: '_structure',
      layout: 'lanscape',
    });
    expect(input).toBe(output);
  });

  it('should render story page with given feature example as empty', () => {
    const { input, output } = createStoryBuilder().addFeatureExample([]);
    expect(input).toBe(output);
  });

  it('should render story page with given common use case example', () => {
    const { input, output } = createStoryBuilder().addCommonUseCasesExample({
      title: 'title',
      description: 'description',
      example: '<div/>',
      layout: 'lanscape',
    });
    expect(input).toBe(output);
  });

  it('should render story page with given common use case example as empty', () => {
    const { input, output } = createStoryBuilder().addCommonUseCasesExample([]);
    expect(input).toBe(output);
  });

  it('should render story page with given description', () => {
    const { input, output } = createStoryBuilder().addDescription('Hello');
    expect(input).toBe(output);
  });

  it('should render story page with given dodont', () => {
    const { input, output } = createStoryBuilder().addDoDont({
      do: ['one'],
      dont: ['two'],
    });
    expect(input).toBe(output);
  });

  it('should render story page with given dodont as empty arrays', () => {
    const { input, output } = createStoryBuilder().addDoDont({
      do: [],
      dont: [],
    });
    expect(input).toBe(output);
  });
});

