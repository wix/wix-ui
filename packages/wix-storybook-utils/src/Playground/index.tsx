import React from 'react';
import * as queryString from 'query-string';
import UploadExportSmall from 'wix-ui-icons-common/UploadExportSmall';
import DownloadImportSmall from 'wix-ui-icons-common/DownloadImportSmall';
import Close from 'wix-ui-icons-common/system/Close';
import Check from 'wix-ui-icons-common/Check';

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

const SaveSuccess = ({ snippetId, urlFormatter, onClose }) => (
  <div className={styles.saveSuccess}>
    Snippet saved! ID: {snippetId}
    {urlFormatter && (
      <a href={urlFormatter(snippetId)} target="_blank">
        Use this link to open playground
      </a>
    )}
    <button className={styles.closeButton} onClick={onClose}>
      <Close />
    </button>
  </div>
);

const Playground = ({ initialCode = '', urlFormatter, ...rest }) => {
  const [code, setCode] = React.useState({ raw: initialCode });
  const [status, setStatus] = React.useState('idle');
  const [snippetId, setSnippedId] = React.useState('');
  let editorCode = '';

  React.useEffect(() => {
    const id =
      (queryString.parse(window.location.search).snippet as string) || null;

    if (id) {
      setStatus('loading');
      loadSnippet(snippetId);
    }
  }, []);

  const save =
    status === 'saveSuccess' ? (
      <SaveSuccess
        snippetId={snippetId}
        urlFormatter={urlFormatter}
        onClose={() => setStatus('idle')}
      />
    ) : (
      <TextButton
        onClick={() => {
          saveSnippet(editorCode).then(id => {
            setSnippedId(id);
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
    status === 'loadPrompt' ? (
      <LoadPrompt
        onClose={() => setStatus('idle')}
        onConfirm={snippetId => {
          loadSnippet(snippetId).then(code => {
            setStatus('idle');
            setCode({ raw: code });
            editorCode = code;
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
        initialCode={code.raw}
        onChange={code => (editorCode = code)}
        {...rest}
      />
    ),
    [code],
  );

  return (
    <>
      <div className={styles.header}>
        {status !== 'loadPrompt' && save}
        {status !== 'saveSuccess' && load}
      </div>
      {memoizedLiveCodeExample}
    </>
  );
};

export default Playground;
