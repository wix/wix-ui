import {storiesOf} from '@storybook/react';
import story from 'wix-storybook-utils/Story';

// yes, there is duplication
// no, you can't DRY it, webpack parses `require.context` as-is, meaning no dynamic parts allowed
const contextualImport = (<any>require).context('../src', true, /^((?!test-common|assets|providers|spec|e2e|driver|protractor|testkit).)+$/);
const rawContextualImport = (<any>require).context('!raw-loader!../src', true, /^((?!test-common|assets|providers|spec|e2e|driver|protractor).)+$/);

const importWith = importer => path =>
  new Promise(resolve => {
    resolve(importer(path));
  });

export default config =>
  story({
    storiesOf,
    moduleName: 'wix-ui-core',
    repoBaseURL: 'https://github.com/wix/wix-ui/tree/master/src/components/',
    contextualImport: importWith(contextualImport),
    rawContextualImport: importWith(rawContextualImport),
    ...config
  });
