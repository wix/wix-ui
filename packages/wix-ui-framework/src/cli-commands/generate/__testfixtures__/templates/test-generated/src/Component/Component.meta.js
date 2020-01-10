import {%ComponentName%} from './{%ComponentName%}';
import Registry from '@ui-autotools/registry';

const metadata = Registry.getComponentMetadata({%ComponentName%});

metadata.exportedFrom({
  path: 'src/{%ComponentName%}/{%ComponentName%}.js',
});
