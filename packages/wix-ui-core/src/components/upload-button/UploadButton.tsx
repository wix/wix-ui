import * as React from 'react';
import style from './UploadButton.st.css';

// ref="fileInput"
export class UploadButton extends React.Component {
  render() {
    return (
      <div {...style('root', {}, this.props)}>
        <label id="label" className={style.label} />
        <input type="file" id="fileInput" className={style.fileInput} />
        <div
          id="chooseFileButton"
          tabIndex={0}
          className={style.chooseFileButton}
        >
          <svg
            width="15px"
            height="15px"
            viewBox="0 0 15 15"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="plusIcon" className={style.plusIcon}>
                <rect id="Rectangle-2" x="6" y="1" width="3" height="13" />
                <rect id="Rectangle" x="1" y="6" width="13" height="3" />
              </g>
            </g>
          </svg>
          <span id="buttonLabel" className={style.buttonLabel} />
        </div>
        <div id="files" className={style.files} />
      </div>
    );
  }
}
