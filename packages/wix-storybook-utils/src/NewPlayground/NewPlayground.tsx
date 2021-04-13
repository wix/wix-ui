import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';
import {Controlled as ReactCodeMirror} from 'react-codemirror2'
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import "./styles.global.scss";
import styles from '../LiveCodeExample/index.scss';

import TextButton from '../TextButton';
import { transformCode } from '../LiveCodeExample/doctor-code';

import {
  LiveProvider,
  LiveError,
  LivePreview
} from 'react-live'

const Error: React.FC<{}> = () => (
  <LiveError className={styles.error}/>
);

const Editor: React.FC<{
  setCode: Function
  code: string
}> = ({ setCode, code }) => {
  const onCodeChange = (_editorInstance, _data, newCode) => {
    setCode(newCode);
  };

  return (
    <ReactCodeMirror
      value={code}
      onBeforeChange={debounce(onCodeChange, 100)}
      options={{
        mode: 'jsx',
        autoCloseTags: true,
        autoCloseBrackets: true,
        theme: 'neo',
        viewportMargin: 50,
        lineNumbers: true,
        extraKeys: {
          Tab: (cm) => {
            if (cm.somethingSelected()) {
              cm.indentSelection('add');
            } else {
              const indent = cm.getOption('indentUnit');
              const spaces = Array(indent + 1).join(' ');
              cm.replaceSelection(spaces);
            }
          },
        },
      }}
    />
  );
}

const NewPlayground: React.FC<{ initialCode: string }> = ({initialCode}) => {
  const [code, setCode] = useState(initialCode);

  const transformCodeLocal = (code) => {
    if (!code) {
      return ''
    }

    let returnValue = code;

    try {
      returnValue = transformCode(code);
    } catch (error) {
      console.log(error)
    }

    return returnValue;
  };

  return (
    <LiveProvider
      scope={{ TextButton }}
      code={code}
      noInline={false}
      transformCode={transformCodeLocal}
    >
      <div className={styles.liveExampleWrapper}>
        <div className={classnames(styles.preview, styles.compactPreview)}>
          <LivePreview />
          <Error />
        </div>
        <Collapse isOpened={true} className={styles.editor}>
          <Editor code={code} setCode={setCode} />
        </Collapse>
      </div>
    </LiveProvider>
  );
}

export default NewPlayground;