import * as React from 'react';

import { DriverDocumentation } from './driver-documentation';
import { Metadata } from '../typings/metadata';

interface Props {
  metadata: Metadata;
}

const has: (
  a: string | RegExp,
) => (b: string) => boolean = needle => haystack =>
  needle instanceof RegExp ? needle.test(haystack) : haystack.includes(needle);

const hasnt = (needle: string | RegExp) => (haystack: string) =>
  !has(needle)(haystack);

const makeTestkitName = ({ fileName, displayName }) => {
  const needles = {
    uni: '.uni.',
    puppeteer: '.puppeteer.',
    protractor: '.protractor.',
    vanilla: new RegExp(`${displayName}\.driver\.[tj]sx?$`),
  };

  return [
    {
      when: has(needles.uni),
      make: () => 'UniDriver Testkit',
    },

    {
      when: has(needles.protractor),
      make: () => 'Protractor Testkit',
    },

    {
      when: has(needles.puppeteer),
      make: () => 'Puppeteer Testkit',
    },

    {
      when: has(needles.vanilla),
      make: () => 'ReactTestUtils Testkit',
    },

    {
      // opposite of all above
      // also acts as fallback
      when: (name: string) =>
        Object.values(needles).every(needle => hasnt(needle)(name)),
      make: () => 'Testkit',
    },
  ]
    .find(({ when }) => when(fileName))
    .make();
};

export const AutoTestkit = ({ metadata }: Props) => (
  <div className="markdown-body">
    <h1 data-hook="auto-testkit-heading">{metadata.displayName} Testkits</h1>

    {metadata.drivers
      .filter(({ error }) => !error)
      .map(({ file, descriptor }) => (
        <DriverDocumentation
          key={file}
          dataHook="auto-testkit-driver"
          name={makeTestkitName({
            fileName: file,
            displayName: metadata.displayName,
          })}
          descriptor={descriptor}
        />
      ))}
  </div>
);
