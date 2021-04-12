import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';
import '!raw-loader!codemirror/lib/codemirror.css';

import CodeBlock from '../CodeBlock';
import TextButton from '../TextButton';
import {UnControlled as ReactCodeMirror} from 'react-codemirror2'
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import debounce from 'lodash/debounce';

import styles from '../LiveCodeExample/index.scss';
import { transformCode } from '../LiveCodeExample/doctor-code';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

export default () => {
  const [code, setCode] = useState('');
  const [parseError, setParseError] = useState(null);

  const onCodeChange = (editorInstance, data, newCode) => {
    // if (editorInstance.hasFocus() && !previewCode) {
    //   validateCode(editorInstance, newCode);
    //   debouncedChange(newCode);
    // }
    console.log(TextButton)
    console.log(newCode)
    setCode(newCode);
  };

  const renderError = () => {
    // return parseError ? (
    //   <div className={styles.error}>{parseError}</div>
    // ) : (
    //   <LiveError className={styles.error} />
    // );
    return <LiveError />
  };

  const transformCodeLocal = (code = '') => {
    console.log(code)

    if (!code) {
      return ''
    }

    let newParseError;
    let returnValue = code;

    try {
      returnValue = transformCode(code);
      newParseError = null;
    } catch (error) {
      console.log(error)
      newParseError = error.message;
    }

    if (newParseError !== parseError) {
      setParseError(newParseError)
    }

    console.log(returnValue);
    return returnValue;
  };

  return (
    <div>
    <ReactCodeMirror
    editorDidMount={(editorInstance) => {
      // editorInstanceRef.current = editorInstance;
      // validateCode(editorInstance, code);
      // setCursorPosition(cursorPosition);
    }}
    onChange={debounce(onCodeChange, 100)}
    onCursorActivity={(editor) => {
      // setTimeout(() => {
      //   if (!editor.somethingSelected() && editor.hasFocus()) {
      //     const { line, ch } = editor.getCursor();

      //     dispatch({
      //       type: 'updateCursorPosition',
      //       payload: { position: { line, ch }, code: editor.getValue() },
      //     });
      //   }
      // });
    }}
    options={{
      mode: 'jsx',
      autoCloseTags: true,
      autoCloseBrackets: true,
      theme: 'neo',
      // gutters: [styles.gutter],
      // hintOptions: { schemaInfo: hints },
      viewportMargin: 50,
      lineNumbers: true,
      extraKeys: {
        Tab: (cm) => {
          if (cm.somethingSelected()) {
            // @ts-ignore
            cm.indentSelection('add');
          } else {
            const indent = cm.getOption('indentUnit');
            const spaces = Array(indent + 1).join(' ');
            cm.replaceSelection(spaces);
          }
        },
        // 'Ctrl-Space': completeIfInTag,
        // "'<'": completeAfter,
        // "'/'": completeIfAfterLt,
        // "' '": completeIfInTag,
        // "'='": completeIfInTag,
      },
    }}
  />
  <h1>Preview</h1>
  <div>{code}</div>
  <LiveProvider
    scope={{ TextButton }}
    code={code}
    noInline={false}
    transformCode={transformCodeLocal}
  >
    <LivePreview></LivePreview>
    {renderError()}
  </LiveProvider>
  </div>
  );
}
