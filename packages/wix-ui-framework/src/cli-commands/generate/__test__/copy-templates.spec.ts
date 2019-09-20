import * as path from 'path';
import * as cista from 'cista';
import { fsToJson } from '../../../fs-to-json';

import { copyTemplates } from '../tasks/copy-templates';

describe('copyTemplates', () => {
  it('should work as expected when description is provided', async () => {
    const fakeFs = cista();
    await copyTemplates({
      ComponentName: 'MyNewComponent',
      description: 'This is a very cool component, yall',
      templates: path.join(__dirname, 'templates'),
      _process: {
        cwd: fakeFs.dir,
      },
    });

    const output = await fsToJson({
      path: '.',
      cwd: fakeFs.dir,
      withContent: true,
    });

    expect(output).toMatchSnapshot();
  });

  it('should work as expected when description is not provided', async () => {
    const fakeFs = cista();
    await copyTemplates({
      ComponentName: 'MyNewComponent',
      description: undefined,
      templates: path.join(__dirname, 'templates'),
      _process: {
        cwd: fakeFs.dir,
      },
    });

    const output = await fsToJson({
      path: '.',
      cwd: fakeFs.dir,
      withContent: true,
    });

    expect(output).toMatchSnapshot();
  });

  describe('given template with lower case `component`', () => {
    it('should rename `component` to given component name but in kebab-case ', async () => {
      const fakeFs = cista();
      await copyTemplates({
        ComponentName: 'MyNewComponent',
        description: undefined,
        templates: path.join(__dirname, 'templates-kebab-case'),
        _process: {
          cwd: fakeFs.dir,
        },
      });

      const output = await fsToJson({
        path: '.',
        cwd: fakeFs.dir,
        withContent: true,
      });

      expect(output).toMatchSnapshot();
    });
  });
});
