import * as React from 'react';

import { DriverDocumentation } from './driver-documentation';
import { Metadata } from '../typings/metadata';

interface Props {
  metadata: Metadata;
}

const has: (a: string) => (b: string) => boolean = needle => haystack =>
  haystack.includes(needle);

const makeTestkitName: (a: string) => string = fileName =>
  [
    {
      when: has('.protractor.'),
      make: () => 'Protractor Testkit',
    },
    {
      when: has('.puppeteer.'),
      make: () => 'Puppeteer Testkit',
    },
    {
      when: has('.uni.'),
      make: () => 'UniDriver Testkit',
    },
    {
      when: () => true,
      make: () => 'Testkit',
    },
  ]
    .find(({ when }) => when(fileName))
    .make();

export const AutoTestkit = ({ metadata }: Props) => (
  <div className="markdown-body">
    <h1 data-hook="auto-testkit-heading">{metadata.displayName} Testkits</h1>

    {metadata.drivers
      .filter(({ error }) => !error)
      .map(({ file, descriptor }) => (
        <DriverDocumentation
          key={file}
          dataHook="auto-testkit-driver"
          name={makeTestkitName(file)}
          descriptor={descriptor}
        />
      ))}
  </div>
);
