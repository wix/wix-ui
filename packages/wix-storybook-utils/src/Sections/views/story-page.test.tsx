import { createStoryBuilder } from './story-page.driver';

describe('StoryPage', () => {
  it('should render simple storyPage', () => {
    const { input, output } = createStoryBuilder();
    expect(input).toBe(output);
  });
});

// it('should render story page with given feature example', () => {
//   const featureExample = {
//     title: 'title',
//     description: 'description',
//     example: '<div/>',
//     layout: 'lanscape',
//   };

//   const { input, output } = createStoryBuilder().addFeatureExample(
//     featureExample,
//   );

//   expect(input).toBe(output);
// });
