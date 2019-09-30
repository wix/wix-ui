import {%ComponentName%} from './{%component-name%}';
import Registry from '@ui-autotools/registry';

const metadata = Registry.getComponentMetadata({%ComponentName%});

metadata.exportedFrom({
  path: 'src/{%component-name%}/{%component-name%}.js',
});
