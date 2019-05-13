import * as fs from 'fs';
import { promisify } from 'util';

const fsAccess = promisify(fs.access);

export const fileExists: (a: string) => Promise<boolean> = path =>
  fsAccess(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
