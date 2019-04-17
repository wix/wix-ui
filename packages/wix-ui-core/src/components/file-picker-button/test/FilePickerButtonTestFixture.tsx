import * as React from 'react';
import { FilePickerButton } from '../FilePickerButton';

export enum DataHook {
  FilePickerButton = 'file-picker-button',
  FileNames = 'file-names',
  OnChangeCount = 'on-change-count',
  ResetButton = 'reset-button',
}

interface FilePickerButtonTestFixtureState {
  selectedFiles: File[];
  onChangeCount: number;
}

export class FilePickerButtonTestFixture extends React.Component<
  {},
  FilePickerButtonTestFixtureState
> {
  private readonly filePickerButtonRef: React.RefObject<FilePickerButton>;

  constructor(props) {
    super(props);

    this.filePickerButtonRef = React.createRef();

    this.state = {
      selectedFiles: [],
      onChangeCount: 0,
    };
  }

  render() {
    const { selectedFiles, onChangeCount } = this.state;
    return (
      <div>
        <FilePickerButton
          data-hook={DataHook.FilePickerButton}
          onChange={this.handleFilePickerButtonOnChange}
          ref={this.filePickerButtonRef}
        />
        <div data-hook={DataHook.FileNames}>
          {selectedFiles.map(f => f.name).join(',')}
        </div>
        <div data-hook={DataHook.OnChangeCount}>{onChangeCount}</div>
        <button
          data-hook={DataHook.ResetButton}
          type="button"
          onClick={this.handleResetButtonClick}
        >
          Reset FilePickerButton
        </button>
      </div>
    );
  }

  private readonly handleFilePickerButtonOnChange = (files: File[]) => {
    const { onChangeCount } = this.state;
    this.setState({
      selectedFiles: [...files],
      onChangeCount: onChangeCount + 1,
    });
  };

  private readonly handleResetButtonClick = () => {
    this.filePickerButtonRef.current.reset();
  };
}
