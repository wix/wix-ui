import * as path from 'path';
import * as nixt from 'nixt';

import * as packageJson from '../package.json';

const cli = (...args) => {
  const command = path.resolve(__dirname, '..', 'bin', 'wuf.js');
  return `${command} ${args.join(' ')}`;
};

describe('wuf', () => {
  describe('help', () => {
    it('should be displayed when no params', done => {
      nixt()
        .expect(({ stdout }) => {
          expect(stdout).toMatchSnapshot();
        })
        .run(cli())
        .end(done);
    });

    it('should be displayed when --help', done => {
      nixt()
        .expect(({ stdout }) => {
          expect(stdout).toMatchSnapshot();
        })
        .run(cli('--help'))
        .end(done);
    });
  });

  describe('-v, --version', () => {
    it('should echo version from package.json', done => {
      nixt()
        .expect(({ stdout }) => {
          expect(stdout).toEqual(packageJson.version);
        })
        .run(cli('--version'))
        .end(done);
    });
  });

  describe('generate', () => {
    describe('--help', () => {
      it('should render help text', done => {
        nixt()
          .expect(({ stdout }) => {
            expect(stdout).toMatchSnapshot();
          })
          .run(cli('generate --help'))
          .end(done);
      });
    });

    it('should ask for component name', done => {
      nixt()
        .expect(({ stdout }) => {
          expect(stdout).toMatch(/Component name \(PascalCase\).*Test/);
        })
        .run(cli('generate'))
        .on(/Component name/)
        .respond('Test\n')
        .end(done);
    });
  });

  describe('export-testkits', () => {
    describe('--help', () => {
      it('should render help text', done => {
        nixt()
          .expect(({ stdout }) => {
            expect(stdout).toMatchSnapshot();
          })
          .run(cli('export-testkits --help'))
          .end(done);
      });
    });

    describe('--definitions', () => {
      it('should fail with error, given non existing path', done => {
        nixt()
          .expect(({ stderr }) => {
            expect(stderr).toMatch(
              /ERROR: Definitions file does not exist at "whatever.js"/,
            );
          })
          .run(cli('export-testkits --definitions whatever.js'))
          .end(done);
      });
    });

    it.skip('should ask for component name', done => {
      nixt()
        .expect(({ stdout }) => {
          expect(stdout).toMatch(/Generating.../);
        })
        .run(cli('export-testkits'))
        .end(done);
    });
  });
});
