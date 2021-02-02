import path from 'path';
import cista from 'cista';
import { fsToJson } from '../../../fs-to-json';

import { copyTemplates } from '../tasks/copy-templates';

const templatesFixturesPath = (folder: string) =>
  path.join(__dirname, '..', '__testfixtures__', 'templates', folder);

describe('copyTemplates', () => {
  it('should work as expected when description is provided', async () => {
    const fakeFs = cista();
    await copyTemplates({
      ComponentName: 'MyNewComponent',
      description: 'This is a very cool component, yall',
      templates: templatesFixturesPath('test-generated'),
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
      templates: templatesFixturesPath('test-generated'),
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
        templates: templatesFixturesPath('kebab-case'),
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

  describe('given template with variable', () => {
    it('should interpolate variable to correct value', async () => {
      const fakeFs = cista();
      await copyTemplates({
        ComponentName: 'MyNewComponent',
        description: undefined,
        templates: templatesFixturesPath('variable-names'),
        _process: {
          cwd: fakeFs.dir,
        },
      });

      const expectedFs = {
        'MyNewComponent.long.extension': '',
        'MyNewComponent.readme.md': '',
        'MyNewComponentTest.spec': '',
        'my-new-component-hello.md': '',
        'my-new-component.ts': '',
        'MyNewComponent.js': '',
        'myNewComponent.js': '',
        'my_new_component.tsx': '',
      };

      const output = await fsToJson({
        path: '.',
        cwd: fakeFs.dir,
        withContent: true,
      });

      expect(output).toEqual(expectedFs);
    });
  });
});
