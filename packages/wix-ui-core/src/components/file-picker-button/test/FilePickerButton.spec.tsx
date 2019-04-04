// file.only
import * as React from 'react';
import { ReactDOMTestContainer } from '../../../../test/dom-test-container';
import { filePickerButtonPrivateUniDriverFactory } from './FilePickerButton.private.uni.driver';
import { FilePickerButton } from '../FilePickerButton';
import { byDataHook } from '../../../../test/utils/unidriver';

describe('FilePickerButton', () => {
  const reactDOMTestContainer = new ReactDOMTestContainer();
  const createDriver = reactDOMTestContainer
    .unmountAfterEachTest()
    .createUniRendererAsync(filePickerButtonPrivateUniDriverFactory);

  const getElementByDataHook = dataHook =>
    reactDOMTestContainer.componentNode.querySelector(byDataHook(dataHook));
  const fileFixture: Partial<File> = { name: 'morty.jpg' };

  describe('props', () => {
    describe(`'children' prop`, () => {
      it('should render the passed children', async () => {
        const dataHook1 = 'child1';
        const dataHook2 = 'child2';
        const children = (
          <>
            <div data-hook={dataHook1}>Get Schwifty</div>
            <div data-hook={dataHook2}>Wubba-lubba-dub-dub</div>
          </>
        );
        const driver = await createDriver(
          <FilePickerButton>{children}</FilePickerButton>,
        );

        const childrenEls = await driver.getContent();
        expect(childrenEls[0].innerHTML).toBe(
          getElementByDataHook(dataHook1).innerHTML,
        );
        expect(childrenEls[1].innerHTML).toBe(
          getElementByDataHook(dataHook2).innerHTML,
        );
      });

      it('should allow getting text', async () => {
        const text = 'Get Schwifty';
        const driver = await createDriver(
          <FilePickerButton>
            <div>{text}</div>
          </FilePickerButton>,
        );

        expect(await driver.getText()).toBe(text);
      });
    });

    describe(`'accept' prop`, () => {
      it('should render', async () => {
        const accept = '.png,.jpg';
        const driver = await createDriver(<FilePickerButton accept={accept} />);
        expect(await driver.getAccept()).toBe(accept);
      });
    });

    describe(`'required' prop`, () => {
      it('should render', async () => {
        const driver = await createDriver(<FilePickerButton required />);
        expect(await driver.isRequired()).toBe(true);
      });
    });

    describe(`'disabled' prop`, () => {
      it('should render', async () => {
        const driver = await createDriver(<FilePickerButton disabled />);
        expect(await driver.isDisabled()).toBe(true);
      });
    });

    describe(`'onFocus' prop`, () => {
      it('should be triggered when button is clicked', async () => {
        const onFocusSpy = jest.fn();
        const driver = await createDriver(
          <FilePickerButton onFocus={onFocusSpy} />,
        );
        await driver.focusChooseFileButton();
        expect(onFocusSpy).toHaveBeenCalled();
      });
    });

    describe(`'onChange' prop`, () => {
      it('should be triggered when file is selected', async () => {
        const onChangeSpy = jest.fn();
        const driver = await createDriver(
          <FilePickerButton onChange={onChangeSpy} />,
        );
        await driver.selectFile(fileFixture);
        expect(onChangeSpy).toHaveBeenCalledWith([fileFixture]);
      });
    });
  });

  describe('ref methods', () => {
    let filePickerButtonRef: React.RefObject<FilePickerButton>;

    beforeEach(() => {
      filePickerButtonRef = React.createRef<FilePickerButton>();
    });

    describe('focus', () => {
      it('should focus `chooseFileButton`', async () => {
        const onFocusSpy = jest.fn();
        await createDriver(
          <FilePickerButton ref={filePickerButtonRef} onFocus={onFocusSpy} />,
        );
        filePickerButtonRef.current.focus();
        expect(onFocusSpy).toHaveBeenCalled();
      });
    });

    describe('blur', () => {
      it('should focus `chooseFileButton`', async () => {
        const onBlurSpy = jest.fn();
        await createDriver(
          <FilePickerButton ref={filePickerButtonRef} onBlur={onBlurSpy} />,
        );
        filePickerButtonRef.current.focus();
        filePickerButtonRef.current.blur();
        expect(onBlurSpy).toHaveBeenCalled();
      });
    });

    describe('reset', () => {
      it('should reset the `file input`', async () => {
        const driver = await createDriver(
          <FilePickerButton ref={filePickerButtonRef} />,
        );
        await driver.selectFile(fileFixture);
        const nativeInputEl = await driver.getNativeInput();
        const setValueSpy = jest.spyOn(nativeInputEl, 'value', 'set');
        expect(setValueSpy).not.toHaveBeenCalled();
        filePickerButtonRef.current.reset();
        expect(setValueSpy).toHaveBeenCalled();
      });
    });

    it('should trigger onChange with empty array when being reset', async () => {
      const onChangeSpy = jest.fn();
      await createDriver(
        <FilePickerButton ref={filePickerButtonRef} onChange={onChangeSpy} />,
      );
      filePickerButtonRef.current.reset();
      expect(onChangeSpy).toHaveBeenCalledWith([]);
    });
  });
});
