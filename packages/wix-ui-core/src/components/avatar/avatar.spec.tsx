import * as React from 'react';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import * as eventually from 'wix-eventually';
import { reactUniDriver } from 'wix-ui-test-utils/vanilla';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { Avatar, AvatarProps } from '.';
import { nameToInitials } from './util';
import { avatarDriverFactory } from './avatar.uni.driver';
import { style, classes, cssStates  } from './avatar.st.css';

/** jsdom simulates loading of the image regardless of the src URL */
const TEST_IMG_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const INVALID_TEST_IMG_URL = '12345';
const PLACEHOLDER_AS_TEXT = <span>XXXXX</span>;

describe('Avatar', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  const createDriver = testContainer.createUniRendererAsync(
    avatarDriverFactory,
  );

  const createDriverFromContainer = () => {
    const base = reactUniDriver(testContainer.componentNode);
    return avatarDriverFactory(base);
  };

  const expectImgEventuallyLoaded = driver =>
    eventually(async () =>
      expect((await driver.getContentType()) === 'image').toBeTruthy(),
    );

  // TODO: remove this hack
  // this is to ensure `onload` is called,
  // because during yoshi3 migration it stopped working
  // hack taken from https://stackoverflow.com/questions/44462665/how-do-you-use-jest-to-test-img-onerror/49204336#49204336
  beforeAll(() => {
    Object.defineProperty((global as any).Image.prototype, 'src', {
      set(src) {
        if (src === TEST_IMG_URL) {
          setTimeout(() => this.onload());
        }
      },
    });
  });

  it('should render an empty placeholder by default', async () => {
    const driver = await createDriver(<Avatar />);
    expect((await driver.getContentType()) === 'placeholder').toBe(true);
  });

  describe(`content type resolution`, () => {
    it('should render a text', async () => {
      const driver = await createDriver(<Avatar text="JD" />);
      expect((await driver.getContentType()) === 'text').toBe(true);
    });

    it('should render a text when name given', async () => {
      const driver = await createDriver(<Avatar name="John Doe" />);
      expect((await driver.getContentType()) === 'text').toBe(true);
    });

    it('should render an placeholder', async () => {
      const driver = await createDriver(
        <Avatar placeholder={PLACEHOLDER_AS_TEXT} />,
      );
      expect((await driver.getContentType()) === 'placeholder').toBe(true);
    });

    it('should render an image', async () => {
      const driver = await createDriver(
        <Avatar imgProps={{ src: TEST_IMG_URL }} />,
      );
      await expectImgEventuallyLoaded(driver);
    });

    it('should render a text when given placeholder and text', async () => {
      const driver = await createDriver(
        <Avatar text="JD" placeholder={PLACEHOLDER_AS_TEXT} />,
      );
      expect((await driver.getContentType()) === 'text').toBe(true);
    });

    it('should render a text when given placeholder and name', async () => {
      const driver = await createDriver(
        <Avatar name="John Doe" placeholder={PLACEHOLDER_AS_TEXT} />,
      );
      expect((await driver.getContentType()) === 'text').toBe(true);
    });

    it('should render an image when given placeholder and image', async () => {
      const driver = await createDriver(
        <Avatar
          placeholder={PLACEHOLDER_AS_TEXT}
          imgProps={{ src: TEST_IMG_URL }}
        />,
      );
      await expectImgEventuallyLoaded(driver);
    });
  });

  describe(`'name' prop`, () => {
    it('should provide generated initials as text content', async () => {
      const driver = await createDriver(<Avatar name="John Doe" />);
      expect(await driver.getTextContent()).toBe('JD');
    });

    it('should NOT override text content', async () => {
      const driver = await createDriver(
        <Avatar name="John Smith Junir Doe" text="JsD" />,
      );
      expect(await driver.getTextContent()).toBe('JsD');
    });

    it('should preserve unicode graphemes (non-ascii)', async () => {
      const driver = await createDriver(<Avatar name="Иван Тесто" />);
      expect(await driver.getTextContent()).toBe('ИТ');
    });

    it('should preserve unicode graphemes (emoji)', async () => {
      const driver = await createDriver(<Avatar name="🏳️‍🌈" />);
      expect(await driver.getTextContent()).toBe('🏳️‍🌈');
    });

    it('should preserve unicode graphemes (accents)', async () => {
      const driver = await createDriver(<Avatar name="ĺo͂řȩm̅ ipsum" />);
      expect(await driver.getTextContent()).toBe('ĹI');
    });

    it('should preserve unicode graphemes (hindi)', async () => {
      const driver = await createDriver(<Avatar name="अनुच्छेद" />);
      expect(await driver.getTextContent()).toBe('अ');
    });

    it(`should have a default 'alt' value when image is displayed`, async () => {
      const dataHook = 'avatar_test_image';
      await testContainer.render(
        <Avatar
          name="John Doe"
          imgProps={{ src: TEST_IMG_URL, ['data-hook']: dataHook }}
        />,
      );
      await eventually(() => {
        const imgElem = testContainer.componentNode.querySelector(
          `[data-hook="${dataHook}"]`,
        );
        expect(imgElem.getAttribute('alt')).toBe('John Doe');
      });
    });

    it(`should NOT override 'alt' value when image is displayed`, async () => {
      const alt = 'Profile photo of John Doe';
      const dataHook = 'avatar_test_image';
      await testContainer.render(
        <Avatar
          name="John Doe"
          imgProps={{
            src: TEST_IMG_URL,
            ['data-hook']: dataHook,
            alt,
          }}
        />,
      );
      await eventually(() => {
        const imgElem = testContainer.componentNode.querySelector(
          `[data-hook="${dataHook}"]`,
        );
        expect(imgElem.getAttribute('alt')).toBe(alt);
      });
    });
  });

  describe(`'placeholder' prop`, () => {
    it('should render specified placeholder content', async () => {
      const dataHook = 'avatar_test_placeholder';
      await testContainer.render(
        <Avatar placeholder={<span data-hook={dataHook}>XXXX</span>} />,
      );
      const placeholderElem = testContainer.componentNode.querySelector(
        `[data-hook="${dataHook}"]`,
      );
      expect(placeholderElem.textContent).toBe('XXXX');
    });
  });

  describe(`'imgProps' prop`, () => {
    it('should render img tag with imgProps', async () => {
      const dataHook = 'avatar_test_image';
      await testContainer.render(
        <Avatar
          imgProps={{
            src: TEST_IMG_URL,
            ['data-hook']: dataHook,
          }}
        />,
      );
      await eventually(() => {
        const imgElem = testContainer.componentNode.querySelector(
          `[data-hook="${dataHook}"]`,
        );
        expect(imgElem.getAttribute('src')).toBe(TEST_IMG_URL);
      });
    });

    // This test is skipped because it either passes with jsdom and fails with browser (mocha-runner), or in it's current form
    // passes in browser and fails in jsdom. Until we decide which platform we are testing on, this needs to stay skipped.
    xit('should reset imgLoading state when src url changes', async () => {
      const dataHook = 'avatar_test_image';
      class AvatarWrapper extends React.Component<AvatarProps> {
        state = { srcUrl: TEST_IMG_URL };

        setUrl(url) {
          this.setState({ srcUrl: url });
        }

        render() {
          return (
            <Avatar
              imgProps={{
                src: this.state.srcUrl,
                ['data-hook']: dataHook,
              }}
            />
          );
        }
      }

      let wrapper: any;

      await testContainer.render(
        <AvatarWrapper
          ref={inst => (wrapper = inst)}
          imgProps={{
            src: TEST_IMG_URL,
            ['data-hook']: dataHook,
          }}
        />,
      );

      await eventually(
        async () => {
          const driver = createDriverFromContainer();
          expect(await driver.isImageLoaded()).toBeTruthy();
        },
        { timeout: 1000 },
      );

      wrapper.setUrl(INVALID_TEST_IMG_URL);

      await eventually(
        async () => {
          const driver = createDriverFromContainer();
          expect(await driver.isImageLoaded()).toBeFalsy();
        },
        { timeout: 1000 },
      );
    });
  });

  describe('nameToInitials', () => {
    describe('limit is invalid type', () => {
      it('should render Avatar with 2 letter initials', async () => {
        const driver = await createDriver(
          <Avatar name="John Smith Junir Doe" initialsLimit={false as any} />,
        );
        expect(await driver.getTextContent()).toBe('JD');
      });
    });

    describe('limit = 3', () => {
      it('should render Avatar with 3 letter initials', async () => {
        const driver = await createDriver(
          <Avatar name="John Smith Junir Doe" initialsLimit={3} />,
        );
        expect(await driver.getTextContent()).toBe('JSD');
      });

      it('should be empty string given undefined name', () => {
        expect(nameToInitials()).toBe('');
      });

      it('should be empty string given empty name', () => {
        expect(nameToInitials('', 3)).toBe('');
      });

      it('should be first initial given 1 name part', () => {
        expect(nameToInitials('John', 3)).toBe('J');
      });

      it('should be first and last initials given 2 name parts', () => {
        expect(nameToInitials('John Doe', 3)).toBe('JD');
      });

      it('should be 3 initials given 3 name parts', () => {
        expect(nameToInitials('John H. Doe', 3)).toBe('JHD');
      });

      it('should be 3 initials given 5 name parts', () => {
        expect(nameToInitials('John Hurley Stanley Kubrik Doe', 3)).toBe('JHD');
      });

      it('should be uppercase given lowercase name parts', () => {
        expect(nameToInitials('john hurley stanley kubrik doe', 3)).toBe('JHD');
      });
    });

    describe('limit = 2 (default)', () => {
      it('should render Avatar with 2 letter initials', async () => {
        const driver = await createDriver(
          <Avatar name="John Smith Junir Doe" />,
        );
        expect(await driver.getTextContent()).toBe('JD');
      });

      it('should be empty string given undefined name', () => {
        expect(nameToInitials()).toBe('');
      });

      it('should be empty string given empty name', () => {
        expect(nameToInitials('')).toBe('');
      });

      it('should be first initial given 1 name part', () => {
        expect(nameToInitials('John')).toBe('J');
      });

      it('should be first and last initials given 2 name parts', () => {
        expect(nameToInitials('John Doe')).toBe('JD');
      });

      it('should be 2 initials given 3 name parts', () => {
        expect(nameToInitials('John H. Doe')).toBe('JD');
      });

      it('should be 2 initials given 5 name parts', () => {
        expect(nameToInitials('John Hurley Stanley Kubrik Doe')).toBe('JD');
      });

      it('should be uppercase given lowercase name parts', () => {
        expect(nameToInitials('john hurley stanley kubrik doe')).toBe('JD');
      });
    });

    describe('limit = 1', () => {
      it('should render Avatar with 1 letter initials', async () => {
        const driver = await createDriver(
          <Avatar name="John Smith Junir Doe" initialsLimit={1} />,
        );
        expect(await driver.getTextContent()).toBe('J');
      });

      it('should be empty string given undefined name', () => {
        expect(nameToInitials()).toBe('');
      });

      it('should be empty string given empty name', () => {
        expect(nameToInitials('', 1)).toBe('');
      });

      it('should be first initial given 1 name part', () => {
        expect(nameToInitials('John', 1)).toBe('J');
      });

      it('should be first initial given 2 name parts', () => {
        expect(nameToInitials('John Doe', 1)).toBe('J');
      });

      it('should be 1 initials given 3 name parts', () => {
        expect(nameToInitials('John H. Doe', 1)).toBe('J');
      });

      it('should be 1 initials given 5 name parts', () => {
        expect(nameToInitials('John Hurley Stanley Kubrik Doe', 1)).toBe('J');
      });

      it('should be uppercase given lowercase name parts', () => {
        expect(nameToInitials('john hurley stanley kubrik doe', 1)).toBe('J');
      });
    });
  });

  describe('className prop', () => {
    it('should pass className prop onto root elemenet', async () => {
      const className = 'foo';
      await testContainer.render(<Avatar className={className} />);
      const driver = reactUniDriver(testContainer.componentNode);
      expect(await driver.attr('class')).toContain(className);
    });
  });

  describe('title prop', () => {
    it('should pass title prop onto root elemenet', async () => {
      const title = 'Avatar for John Doe';
      const driver = createDriver(<Avatar title={title} />);
      const unDriver = reactUniDriver(testContainer.componentNode);
      expect(await unDriver.attr('title')).toBe(title);
    });

    it('should have default value for title if name is provided', async () => {
      const name = 'John Doe';
      const driver = createDriver(<Avatar name={name} />);
      const unDriver = reactUniDriver(testContainer.componentNode);
      expect(await unDriver.attr('title')).toBe(name);
    });
  });

  describe('aria-label prop', () => {
    it('should pass aria-label prop onto root elemenet', async () => {
      const ariaLabel = 'Avatar for John Doe';
      const driver = createDriver(<Avatar ariaLabel={ariaLabel} />);
      const unDriver = reactUniDriver(testContainer.componentNode);
      expect(await unDriver.attr('aria-label')).toBe(ariaLabel);
    });

    it('should have default value for aria-label if name is provided', async () => {
      const name = 'John Doe';
      const driver = createDriver(<Avatar name={name} />);
      const unDriver = reactUniDriver(testContainer.componentNode);
      expect(await unDriver.attr('aria-label')).toBe(name);
    });
  });

  describe('onClick prop', () => {
    it('should be called on click', async () => {
      const onClick = jest.fn();
      const driver = await createDriver(<Avatar onClick={onClick} />);
      await driver.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe(`Styling`, () => {
    describe('content pseudo element', () => {
      it('should have content class when text displayed', async () => {
        await testContainer.render(<Avatar text="JD" />);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(utils.select('.content').textContent).toBe('JD');
      });

      it('should have content class when placeholder displayed', async () => {
        await testContainer.render(
          <Avatar placeholder={PLACEHOLDER_AS_TEXT} />,
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(utils.select('.content').textContent).toBe('XXXXX');
      });

      it('should have content class when image displayed', async () => {
        await testContainer.render(<Avatar imgProps={{ src: TEST_IMG_URL }} />);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        await eventually(() => {
          expect(utils.select('.content').getAttribute('src')).toBe(
            TEST_IMG_URL,
          );
        });
      });
    });

    describe('imgLoaded state', () => {
      it('should have imgLoaded', async () => {
        await testContainer.render(<Avatar imgProps={{ src: TEST_IMG_URL }} />);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        await eventually(() => {
          expect(
            utils.hasStyleState(testContainer.componentNode, 'imgLoaded'),
          ).toBeTruthy();
        });
      });

      it('should NOT have imgLoaded when displaying text', async () => {
        await testContainer.render(<Avatar name="John Doe" />);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(
          utils.hasStyleState(testContainer.componentNode, 'imgLoaded'),
        ).toBeFalsy();
      });

      // This test is skipped because it either passes with jsdom and fails with browser (mocha-runner), or in it's current form
      // passes in browser and fails in jsdom. Until we decide which platform we are testing on, this needs to stay skipped.
      xit('should NOT have imgLoaded when img is not loaded yet', async () => {
        await testContainer.render(
          <Avatar imgProps={{ src: INVALID_TEST_IMG_URL }} />,
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        await eventually(
          () => {
            expect(
              utils.hasStyleState(testContainer.componentNode, 'imgLoaded'),
            ).toBeFalsy();
          },
          { timeout: 1000 },
        );
      });
    });

    describe('contentType state', () => {
      it('should be text', async () => {
        await testContainer.render(<Avatar text="JD" />);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(
          utils.getStyleState(testContainer.componentNode, 'contentType'),
        ).toBe('text');
      });

      it('should be placeholder', async () => {
        await testContainer.render(
          <Avatar placeholder={PLACEHOLDER_AS_TEXT} />,
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(
          utils.getStyleState(testContainer.componentNode, 'contentType'),
        ).toBe('placeholder');
      });

      it('should be image', async () => {
        await testContainer.render(<Avatar imgProps={{ src: TEST_IMG_URL }} />);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        await eventually(() => {
          expect(
            utils.getStyleState(testContainer.componentNode, 'contentType'),
          ).toBe('image');
        });
      });
    });
  });
});
