import React from 'react';
import debounce from 'lodash/debounce';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';

import { formatCode } from './doctor-code';
import './styles.global.scss';
import { Hints } from './constants';

interface Props {
  initialFormattedCode?: string;
  onChange: Function;
  editorCodeUpdater: Function;
  hints?: Hints;
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

  const completeAfter = (
    codemirror: CodeMirror.Editor,
    predicate?: () => boolean,
  ) => {
    if (!predicate || predicate()) {
      setTimeout(() => {
        if (!codemirror.state.completionActive) {
          codemirror.showHint({ completeSingle: false });
        }
      }, 100);
    }

    return CodeMirror.Pass;
  };

  const completeIfInTag = (
    codemirror: CodeMirror.Editor,
    ignoreAutocomplete?: boolean,
  ) => {
    return completeAfter(codemirror, () => {
      const token = codemirror.getTokenAt(codemirror.getCursor());

      if (
        ignoreAutocomplete ||
        (token.type === 'string' &&
          (!/['"]/.test(token.string.charAt(token.string.length - 1)) ||
            token.string.length === 1))
      ) {
        return false;
      }

      const inner = CodeMirror.innerMode(codemirror.getMode(), token.state)
        .state;
      return inner.tagName;
    });
  };

  const completeIfInTagNewAttribute = (codemirror: CodeMirror.Editor) => {
    const { line, ch } = codemirror.getCursor();
    const nextChar = codemirror.getRange({ line, ch }, { line, ch: ch + 1 });
    const enableAutocomplete = !nextChar || /[\s>]/.test(nextChar);

    return completeIfInTag(codemirror, !enableAutocomplete);
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
        extraKeys: {
          Tab: codemirror => {
            if (codemirror.somethingSelected()) {
              codemirror.indentSelection('add');
            } else {
              const indent = codemirror.getOption('indentUnit');
              const spaces = Array(indent + 1).join(' ');
              codemirror.replaceSelection(spaces);
            }
          },
          "'<'": completeAfter,
          'Cmd-I': completeIfInTag,
          'Ctrl-I': completeIfInTag,
          "'='": completeIfInTag,
          "' '": completeIfInTagNewAttribute,
          Enter: completeIfInTagNewAttribute,
        },
      }}
    />
  );
};

export default Editor;
