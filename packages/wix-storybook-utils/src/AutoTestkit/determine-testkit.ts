const has: (
  a: string | RegExp,
) => (b: string) => boolean = needle => haystack =>
  needle instanceof RegExp ? needle.test(haystack) : haystack.includes(needle);

const hasnt = (needle: string | RegExp) => (haystack: string) =>
  !has(needle)(haystack);

const enum TestkitType {
  vanilla = 'vanilla',
  unidriver = 'unidriver',
  protractor = 'protractor',
  puppeteer = 'puppeteer',
  unknown = 'unknown',
}

interface DetermineTestkit {
  fileName: string;
  displayName: string;
}

interface Output {
  type: TestkitType;
  title: string;
}

export const determineTestkit: (a: DetermineTestkit) => Output = ({
  fileName,
  displayName,
}) => {
  const needles = {
    uni: '.uni.',
    puppeteer: '.puppeteer.',
    protractor: '.protractor.',
    vanilla: new RegExp(`${displayName}\.driver\.[tj]sx?$`),
  };

  return [
    {
      when: has(needles.uni),
      make: {
        type: TestkitType.unidriver,
        title: 'UniDriver Testkit',
      },
    },

    {
      when: has(needles.protractor),
      make: {
        type: TestkitType.protractor,
        title: 'Protractor Testkit',
      },
    },

    {
      when: has(needles.puppeteer),
      make: {
        type: TestkitType.puppeteer,
        title: 'Puppeteer Testkit',
      },
    },

    {
      when: has(needles.vanilla),
      make: {
        type: TestkitType.vanilla,
        title: 'ReactTestUtils Testkit',
      },
    },

    {
      // opposite of all above
      // also acts as fallback
      when: fileTitle =>
        Object.values(needles).every(needle => hasnt(needle)(fileTitle)),
      make: {
        type: TestkitType.unknown,
        title: 'Testkit',
      },
    },
  ].find(({ when }) => when(fileName)).make;
};

export const isUnidriver = file => file.includes('.uni.');
