import * as CodeMirror from 'codemirror';

export const completeAfter = (
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

export const completeIfInTag = (
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

    const inner = CodeMirror.innerMode(codemirror.getMode(), token.state).state;
    return inner.tagName;
  });
};

export const completeIfInTagNewAttribute = (codemirror: CodeMirror.Editor) => {
  const { line, ch } = codemirror.getCursor();
  const nextChar = codemirror.getRange({ line, ch }, { line, ch: ch + 1 });
  const enableAutocomplete = !nextChar || /[\s>]/.test(nextChar);

  return completeIfInTag(codemirror, !enableAutocomplete);
};

export const handleIndentation = codemirror => {
  if (codemirror.somethingSelected()) {
    codemirror.indentSelection('add');
  } else {
    const indent: number = codemirror.getOption('indentUnit');
    const spaces = Array(indent + 1).join(' ');
    codemirror.replaceSelection(spaces);
  }
};
