import * as fs from 'fs';
import { promisify } from 'util';

import { Path } from './typings.d';

const fsAccess = promisify(fs.access);

export const fileExists: (a: Path) => Promise<boolean> = path =>
  fsAccess(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
