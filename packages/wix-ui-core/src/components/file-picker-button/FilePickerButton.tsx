import * as React from 'react';

import { style, classes } from './FilePickerButton.st.css';
import { DataHook } from './test/FilePickerButton.helpers';
import { noop } from '../../utils';

export interface FilePickerButtonProps {
  id?: string;
  /** Allows overriding the component's styles. */
  className?: string;
  /** Elements to render inside the button. */
  children?: React.ReactNode;
  /** A string that defines the file types the file input should accept. */
  accept?: string;
  required?: boolean;
  disabled?: boolean;
  onFocus?: Function;
  onBlur?: Function;
  /** Triggered when the user finishes selecting files through a native OS file picker dialog. */
  onChange?(files: File[]): void;
}

interface FilePickerButtonState {
  selectedFiles: File[];
}

export class FilePickerButton extends React.Component<
  FilePickerButtonProps,
  FilePickerButtonState
> {
  static displayName = 'FilePickerButton';
  static defaultProps = {
    required: false,
    disabled: false,
    onFocus: noop,
    onBlur: noop,
    onChange: noop,
  };

  private readonly fileInputRef: React.RefObject<HTMLInputElement>;
  private readonly chooseFileButtonRef: React.RefObject<HTMLButtonElement>;

  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();
    this.chooseFileButtonRef = React.createRef();

    this.state = {
      selectedFiles: [],
    };
  }

  render() {
    const { id, children, accept, required, disabled } = this.props;
    const buttonId = id ? `${DataHook.ChooseFileButton}-${id}` : null;
    return (
      <div
        className={style(
          classes.root,
          { required, disabled },
          this.props.className,
        )}
      >
        <input
          id={id}
          type="file"
          tabIndex={-1}
          data-hook={DataHook.FileInput}
          ref={this.fileInputRef}
          className={classes.fileInput}
          onChange={this.handleFileInputChange}
          accept={accept}
          required={required}
          disabled={disabled}
          aria-labelledby={buttonId}
        />
        <button
          id={buttonId}
          type="button"
          data-hook={DataHook.ChooseFileButton}
          ref={this.chooseFileButtonRef}
          className={classes.chooseFileButton}
          onClick={this.handleChooseFileButtonClick}
          onFocus={this.handleChooseFileButtonFocus}
          onBlur={this.handleChooseFileButtonBlur}
          disabled={disabled}
        >
          {children}
        </button>
      </div>
    );
  }

  focus() {
    this.chooseFileButtonRef.current.focus();
  }

  blur() {
    this.chooseFileButtonRef.current.blur();
  }

  reset() {
    this.fileInputRef.current.value = '';
    this.props.onChange([]);
  }

  private readonly handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files);
    this.props.onChange(files);
  };

  private readonly handleChooseFileButtonClick = () => {
    if (!this.props.disabled) {
      this.fileInputRef.current.click();
      this.chooseFileButtonRef.current.blur();
    }
  };

  private readonly handleChooseFileButtonFocus = (
    e: React.FocusEvent<HTMLButtonElement>,
  ) => {
    !this.props.disabled && this.props.onFocus(e);
  };

  private readonly handleChooseFileButtonBlur = (
    e: React.FocusEvent<HTMLButtonElement>,
  ) => {
    !this.props.disabled && this.props.onBlur(e);
  };
}
