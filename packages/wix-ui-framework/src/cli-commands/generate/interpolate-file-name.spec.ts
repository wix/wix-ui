import { interpolateFileName } from './interpolate-file-name';

const names = {
  ComponentName: 'BatMan',
  componentName: 'batMan',
  'component-name': 'bat-man',
  component_name: 'bat_man',
};

describe('interpolateFileNames', () => {
  [
    ['folder/$ComponentName.file', 'folder/BatMan.file'],
    ['folder/folder/$componentName.file', 'folder/folder/batMan.file'],
    [
      '$component-name/$component_name_test/$componentName.file',
      'bat-man/bat_man_test/batMan.file',
    ],
  ].forEach(([assertion, expectation]) =>
    it(`should replace ${assertion} to ${expectation}`, () => {
      expect(interpolateFileName({ filename: assertion, names })).toEqual(
        expectation,
      );
    }),
  );
});
