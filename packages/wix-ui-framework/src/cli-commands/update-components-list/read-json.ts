import * as fs from 'fs';

export const readJson = path => {
  try {
    const json = fs.readFileSync(path, 'utf8');
    return JSON.parse(json);
  } catch (e) {
    return {};
  }
};
