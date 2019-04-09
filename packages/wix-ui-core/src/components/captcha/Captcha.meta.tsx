import Registry from '@ui-autotools/registry';
import { Captcha } from './Captcha';
import { ExampleLoader } from './test-assets/ExampleLoader';
import { CaptchaLang, Size, Theme } from './types';
import * as React from 'react';
import { constants } from './test-assets/constants';

const demoSiteKey = constants.demoSiteKey;
const captchaMetadata = Registry.getComponentMetadata(Captcha);

captchaMetadata.addSim({
  title: 'Simulation FrenchCanadian lang',
  props: {
    lang: CaptchaLang.FrenchCanadian,
    sitekey: demoSiteKey,
    loader: <ExampleLoader />,
  },
});

captchaMetadata.addSim({
  title: 'Simulation English lang default',
  props: {
    sitekey: demoSiteKey,
    loader: <ExampleLoader />,
  },
});

captchaMetadata.addSim({
  title: 'Simulation compact size',
  props: {
    sitekey: demoSiteKey,
    size: Size.compact,
    loader: <ExampleLoader />,
  },
});

captchaMetadata.addSim({
  title: 'Simulation compact size with dark',
  props: {
    sitekey: demoSiteKey,
    size: Size.compact,
    theme: Theme.dark,
    loader: <ExampleLoader />,
  },
});

captchaMetadata.addSim({
  title: 'Simulation Theme dark size normal',
  props: {
    sitekey: demoSiteKey,
    size: Size.normal,
    theme: Theme.dark,
    loader: <ExampleLoader />,
  },
});

captchaMetadata.addSim({
  title: 'Simulation compact size with light',
  props: {
    sitekey: demoSiteKey,
    size: Size.compact,
    theme: Theme.light,
    loader: <ExampleLoader />,
  },
});

captchaMetadata.addSim({
  title: 'Simulation Theme light size normal',
  props: {
    sitekey: demoSiteKey,
    size: Size.normal,
    theme: Theme.light,
    loader: <ExampleLoader />,
  },
});
