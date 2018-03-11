import {getStoryUrl, createStoryUrl} from '../src/protractor/protractor-helpers';

describe('protractor-helpers', () => {

  describe('getStoryUrl', () => {
    const kind = '3. Inputs';
    const story = '3.2 + InputArea';

    const EXPECTED_URL_BASE = 'iframe.html?selectedKind=3.%20Inputs&selectedStory=3.2%20%2B%20InputArea';

    it('Should create story url using deprecated version', () => {
      expect(getStoryUrl(kind, story))
      .toEqual(`${EXPECTED_URL_BASE}&withExamples=`);
    });

    it('Should create story url with options', () => {
      expect(createStoryUrl({kind, story}))
      .toEqual(`${EXPECTED_URL_BASE}&withExamples=`);
    });

    it('Should create story url without examples', () => {
      expect(createStoryUrl({kind, story, withExamples: false}))
      .toEqual(`${EXPECTED_URL_BASE}`);
    });

    it('Should create story url with examples', () => {
      expect(createStoryUrl({kind, story, withExamples: true}))
      .toEqual(`${EXPECTED_URL_BASE}&withExamples=`);
    });
  });
});
