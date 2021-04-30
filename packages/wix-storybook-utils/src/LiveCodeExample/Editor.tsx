import React from 'react';
import debounce from 'lodash/debounce';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';

import { formatCode } from './doctor-code';
import {
  completeAfter,
  completeIfInTag,
  completeIfInTagNewAttribute,
  handleIndentation,
} from './autocomplete-utils';
import './styles.global.scss';
import { ComponentsHints } from '../typings/components-hints';

const autoCompleteHotkeysMap = {
  "'<'": completeAfter,
  'Cmd-I': completeIfInTag,
  'Ctrl-I': completeIfInTag,
  "'='": completeIfInTag,
  Space: completeIfInTagNewAttribute,
  Enter: completeIfInTagNewAttribute,
  Tab: handleIndentation,
};

interface Props {
  initialFormattedCode?: string;
  onChange: Function;
  editorCodeUpdater: Function;
  hints?: ComponentsHints;
}

const Editor = ({
  initialFormattedCode,
  hints,
  editorCodeUpdater,
  onChange,
}: Props) => {
  const editorDidMount = (editor: CodeMirror.Editor) => {
    editor.setValue(initialFormattedCode);
    editorCodeUpdater(code => editor.setValue(code));
  };

  const onCodeChange = (_editor, _data, newCode) => {
    onChange(newCode);
  };

  const debouncedOnCodeChange = debounce(onCodeChange, 100, {
    trailing: true,
  });

  const prettifyCode = (editor: CodeMirror.Editor) => {
    try {
      const formattedValue = formatCode(editor.getValue());
      editor.setValue(formattedValue);
      onChange(formattedValue);
    } catch (e) {
      console.error('Unable to prettify code', e);
    }
  };

  const liveEditorOnKeyDown = (editor: CodeMirror.Editor, e: KeyboardEvent) => {
    const shouldPrettify = [
      /* windows & unix: ctrl + s */
      e.ctrlKey && e.key === 's',

      /* osx: command + s */
      e.metaKey && e.key === 's',
    ].some(Boolean);

    if (shouldPrettify) {
      e.stopPropagation();
      e.preventDefault();

      const { ch, line } = editor.getCursor();

      prettifyCode(editor);

      editor.setCursor({ ch, line });
    }
  };

  return (
    <ReactCodeMirror
      onChange={debouncedOnCodeChange}
      editorDidMount={editorDidMount}
      onKeyDown={liveEditorOnKeyDown}
      options={{
        mode: 'jsx',
        autoCloseTags: true,
        autoCloseBrackets: true,
        theme: 'wsr',
        viewportMargin: 50,
        lineNumbers: true,
        hintOptions: {
          schemaInfo: hints,
        } as CodeMirror.ShowHintOptions,
        extraKeys: autoCompleteHotkeysMap,
      }}
    />
  );
};

export default Editor;
