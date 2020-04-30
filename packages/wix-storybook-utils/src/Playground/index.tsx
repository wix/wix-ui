import React from 'react';
import * as queryString from 'query-string';
import UploadExportSmall from 'wix-ui-icons-common/UploadExportSmall';
import DownloadImportSmall from 'wix-ui-icons-common/DownloadImportSmall';
import Close from 'wix-ui-icons-common/system/Close';
import Check from 'wix-ui-icons-common/Check';

import { createReducer } from './create-reducer';
import { formatCode } from '../LiveCodeExample/format-code';
import LiveCodeExample from '../LiveCodeExample';
import TextButton from '../TextButton';
import styles from './styles.scss';

const snippetDatastoreUrl = `https://www.wix.com/_serverless/wix-style-react-playground/snippet/`;

const loadSnippet = async snippetId => {
  const response = await fetch(`${snippetDatastoreUrl}/${snippetId}`);
  const code = await response.text();
  return code && code.trim().length ? formatCode(code) : '';
};

const saveSnippet = async (code: string): Promise<string> => {
  const response = await fetch(snippetDatastoreUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: code }),
  });
  const snippetId = await response.text();
  return snippetId;
};

const LoadPrompt = ({ onClose, onConfirm }) => {
  const [value, setValue] = React.useState('');

  return (
    <div className={styles.loadPrompt}>
      <div>
        {'Snippet ID: '}
        <input
          className={styles.loadPromptInput}
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          maxLength={36}
          type="text"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </div>
      <button
        className={styles.loadPromptButton}
        onClick={() => onConfirm(value)}
      >
        <Check />
      </button>
      <button className={styles.closeButton} onClick={onClose}>
        <Close />
      </button>
    </div>
  );
};

const SaveSuccess = ({ snippetId, formatUrl, onClose }) => (
  <div className={styles.saveSuccess}>
    {'Snippet saved! ID: '}
    {formatUrl ? (
      <a href={formatUrl(snippetId)} target="_blank">
        {snippetId}
      </a>
    ) : (
      snippetId
    )}
    <button className={styles.closeButton} onClick={onClose}>
      <Close />
    </button>
  </div>
);

const previewWarning = ({ onConfirm }) => (
  <div className={styles.previewWarning}>
    <h3>WARNING!</h3>
    Evaluating downloaded code can be dangerous!
    <br />
    Inspect code before running it!
    <button onClick={onConfirm}>OK, I trust this code</button>
  </div>
);

const actions = {
  setLoadedCode: (state, { code }) => ({ ...state, loadedCode: code }),
  setEditorCode: (state, { code }) => ({ ...state, editorCode: code }),
  setStatus: (state, { status }) => ({ ...state, status }),
  setSnippetId: (state, { id }) => ({ ...state, snippetId: id }),
  setShowPreviewWarning: (state, { showPreviewWarning }) => ({
    ...state,
    showPreviewWarning,
  }),
};

const Playground = ({ initialCode = '', formatSnippetUrl, ...rest }) => {
  const initialState = {
    editorCode: '',
    loadedCode: initialCode,
    status: 'idle',
    snippetId: '',
    showPreviewWarning: false,
  };
  const [state, dispatch] = React.useReducer(
    createReducer(initialState, actions),
    initialState,
  );
  const setEditorCode = code => dispatch({ type: 'setEditorCode', code });
  const setLoadedCode = code => dispatch({ type: 'setLoadedCode', code });
  const setSnippetId = (id: string) => dispatch({ type: 'setSnippetId', id });
  const setStatus = (status: string) => dispatch({ type: 'setStatus', status });
  const setShowPreviewWarning = (showPreviewWarning: boolean) =>
    dispatch({ type: 'setShowPreviewWarning', showPreviewWarning });

  React.useEffect(() => {
    const id =
      (queryString.parse(window.location.search).snippet as string) || null;

    if (id) {
      setStatus('loading');
      void loadSnippet(id).then(snippetCode => {
        setShowPreviewWarning(true);
        setStatus('idle');
        setLoadedCode(snippetCode);
      });
    }
  }, []);

  const save =
    state.status === 'saveSuccess' ? (
      <SaveSuccess
        snippetId={state.snippetId}
        formatUrl={formatSnippetUrl}
        onClose={() => setStatus('idle')}
      />
    ) : (
      <TextButton
        onClick={() => {
          void saveSnippet(state.editorCode || state.loadedCode).then(id => {
            setSnippetId(id);
            setStatus('saveSuccess');
          });
        }}
        disabled={status === 'loading'}
        prefixIcon={<UploadExportSmall />}
      >
        Save
      </TextButton>
    );

  const load =
    state.status === 'loadPrompt' ? (
      <LoadPrompt
        onClose={() => setStatus('idle')}
        onConfirm={(id: string) => {
          void loadSnippet(id).then(snippetCode => {
            setShowPreviewWarning(true);
            setStatus('idle');
            setLoadedCode(snippetCode);
          });
        }}
      />
    ) : (
      <TextButton
        onClick={() => setStatus('loadPrompt')}
        prefixIcon={<DownloadImportSmall />}
      >
        Load
      </TextButton>
    );

  const memoizedLiveCodeExample = React.useMemo(
    () => (
      <LiveCodeExample
        initialCode={state.loadedCode}
        previewWarning={state.showPreviewWarning ? previewWarning : null}
        onChange={setEditorCode}
        {...rest}
      />
    ),
    [state.loadedCode],
  );

  return (
    <>
      <div className={styles.header}>
        {state.status !== 'loadPrompt' && save}
        {state.status !== 'saveSuccess' && load}
      </div>
      {memoizedLiveCodeExample}
    </>
  );
};

export default Playground;
