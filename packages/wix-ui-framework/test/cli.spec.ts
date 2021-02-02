import path from 'path';
import nixt from 'nixt';
import cista from 'cista';

import * as packageJson from '../package.json';

const cli = (...args) => {
  const command = path.resolve(__dirname, '..', 'bin', 'wuf.js');
  return `${command} ${args.join(' ')}`;
};

describe('wuf', () => {
  describe('help', () => {
    it('should be displayed when no params', (done) => {
      nixt()
        .expect(({ stdout }) => {
          expect(stdout).toMatchSnapshot();
        })
        .run(cli())
        .end(done);
    });

    it('should be displayed when --help', (done) => {
      nixt()
        .expect(({ stdout }) => {
          expect(stdout).toMatchSnapshot();
        })
        .run(cli('--help'))
        .end(done);
    });
  });

  describe('-v, --version', () => {
    it('should echo version from package.json', (done) => {
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
      it('should render help text', (done) => {
        nixt()
          .expect(({ stdout }) => {
            expect(stdout).toMatchSnapshot();
          })
          .run(cli('generate --help'))
          .end(done);
      });
    });

    describe('--component-name', () => {
      it('should prompt for component name by default', (done) => {
        nixt()
          .expect(({ stdout }) => {
            expect(stdout).toMatch(/Component name \(PascalCase\).*Test/);
          })
          .run(cli('generate'))
          .on(/Component name/)
          .respond('Test\n')
          .end(done);
      });

      it('should not prompt for component name given --component-name flag', (done) => {
        nixt()
          .expect(({ stdout }) => {
            expect(stdout).toMatch(/Generating.*<Testable\/>.*component/);
          })
          .run(cli('generate --component-name Testable --force'))
          .end(done);
      });
    });
  });

  describe('export-testkits', () => {
    describe('--help', () => {
      it('should render help text', (done) => {
        nixt()
          .expect(({ stdout }) => {
            expect(stdout).toMatchSnapshot();
          })
          .run(cli('export-testkits --help'))
          .end(done);
      });
    });

    describe('--output', () => {
      it('should fail with error, when --output is missing', (done) => {
        nixt()
          .expect(({ stderr }) => {
            expect(stderr).toMatch(
              /Error: missing --output parameter, it must be defined/,
            );
          })
          .run(cli('export-testkits'))
          .end(done);
      });
    });

    describe('--definitions', () => {
      it('should fail with error, given non existing path', (done) => {
        nixt()
          .expect(({ stderr }) => {
            expect(stderr).toMatch(
              /Error: Unable to load definitions file at ".*whatever.js"/,
            );
          })
          .run(cli('export-testkits --output test --definitions whatever.js'))
          .end(done);
      });
    });
  });

  describe('update', () => {
    describe('--help', () => {
      it('should render help text', (done) => {
        nixt()
          .expect(({ stdout }) => {
            expect(stdout).toMatchSnapshot();
          })
          .run(cli('update --help'))
          .end(done);
      });
    });
  });
});
