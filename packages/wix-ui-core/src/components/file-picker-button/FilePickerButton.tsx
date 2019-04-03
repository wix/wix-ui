import * as React from 'react';
import style from './FilePickerButton.st.css';
import { noop } from '../../utils';
import { DataHook } from './test/FilePickerButton.helpers';

export interface FilePickerButtonProps {
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
    const { children, accept, required, disabled } = this.props;
    return (
      <div {...style('root', { required, disabled }, this.props)}>
        <input
          type="file"
          tabIndex={-1}
          data-hook={DataHook.FileInput}
          ref={this.fileInputRef}
          className={style.fileInput}
          onChange={this.handleFileInputChange}
          accept={accept}
          required={required}
          disabled={disabled}
        />
        <button
          type="button"
          data-hook={DataHook.ChooseFileButton}
          ref={this.chooseFileButtonRef}
          className={style.chooseFileButton}
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

  private handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    this.props.onChange(files);
  };

  private handleChooseFileButtonClick = () => {
    if (!this.props.disabled) {
      this.fileInputRef.current.click();
      this.chooseFileButtonRef.current.blur();
    }
  };

  private handleChooseFileButtonFocus = (
    e: React.FocusEvent<HTMLButtonElement>,
  ) => {
    !this.props.disabled && this.props.onFocus(e);
  };

  private handleChooseFileButtonBlur = (
    e: React.FocusEvent<HTMLButtonElement>,
  ) => {
    !this.props.disabled && this.props.onBlur(e);
  };
}
