import React, { Dispatch } from 'react';
import * as queryString from 'query-string';
import UploadExportSmall from 'wix-ui-icons-common/UploadExportSmall';
import Close from 'wix-ui-icons-common/system/Close';

import { formatCode } from '../LiveCodeExample/format-code';
import LiveCodeExample from '../LiveCodeExample';
import { Props as LiveCodeExampleProps } from '../LiveCodeExample/LiveCodeExample';
import TextButton from '../TextButton';
import { CopyButton } from '../CopyButton';
import styles from './styles.scss';

const snippetDatastoreUrl = `https://www.wix.com/_serverless/wix-style-react-playground/snippet`;

const loadSnippet = async (snippetId: string) => {
  try {
    const response = await fetch(`${snippetDatastoreUrl}/${snippetId}`);
    const code = await response.text();
    return code && code.trim().length ? formatCode(code) : '';
  } catch (error) {
    return Promise.reject(error);
  }
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

const SaveSuccess = ({
  snippetId,
  formatUrl = (id: string) => `${window.parent.location.href}&snippet=${id}`,
  onClose,
}) => {
  const url = formatUrl(snippetId);

  return (
    <div className={styles.saveSuccess}>
      {'Saved! '}
      <a href={url} target="_blank">
        {snippetId}
      </a>
      <CopyButton source={url} />
      <button className={styles.closeButton} onClick={onClose}>
        <Close />
      </button>
    </div>
  );
};

const previewWarning = ({ onConfirm }) => (
  <div className={styles.previewWarning}>
    <h3>WARNING!</h3>
    <p>Evaluating downloaded code can be dangerous!</p>
    <p>Inspect code before running it!</p>
    <button onClick={onConfirm}>OK, I trust this code</button>
  </div>
);

interface State {
  editorCode: string;
  loadedCode: string;
  status:
    | 'idle'
    | 'loading'
    | 'saving'
    | 'saveSuccess'
    | 'saveFailure'
    | 'loadFailure';
  snippetId: string;
  showPreviewWarning: boolean;
}

interface Props extends LiveCodeExampleProps {
  formatSnippetUrl(snippetId: string): string;
}

const getView = (views, view) => (views[view] || views.idle)();

const Playground: React.FunctionComponent<Props> = ({
  initialCode = '',
  formatSnippetUrl,
  ...rest
}) => {
  const initialState: State = {
    editorCode: '',
    loadedCode: initialCode,
    status: 'idle',
    snippetId: '',
    showPreviewWarning: false,
  };

  const [state, setState]: [State, Dispatch<Partial<State>>] = React.useReducer(
    (currentState: State, newState: Partial<State>) => ({
      ...currentState,
      ...newState,
    }),
    initialState,
  );

  React.useEffect(() => {
    const id =
      (queryString.parse(window.location.search).snippet as string) || null;

    if (id) {
      setState({ status: 'loading' });
      void loadSnippet(id)
        .then(loadedCode =>
          setState({ loadedCode, status: 'idle', showPreviewWarning: true }),
        )
        .catch(error => {
          console.log(error);
          setState({ status: 'loadFailure' });
        });
    }
  }, []);

  const memoizedLiveCodeExample = React.useMemo(
    () => (
      <LiveCodeExample
        initialCode={state.loadedCode}
        previewWarning={state.showPreviewWarning ? previewWarning : null}
        onChange={(editorCode: string) => setState({ editorCode })}
        {...rest}
      />
    ),
    [state.loadedCode],
  );

  const headerViews = {
    loadFailure: () => null,
    idle: () => (
      <TextButton
        onClick={() => {
          setState({ status: 'saving' });
          void saveSnippet(
            state.editorCode || state.loadedCode,
          ).then(snippetId => setState({ snippetId, status: 'saveSuccess' }));
        }}
        prefixIcon={<UploadExportSmall />}
      >
        Save
      </TextButton>
    ),

    saveSuccess: () => (
      <SaveSuccess
        snippetId={state.snippetId}
        formatUrl={formatSnippetUrl}
        onClose={() => setState({ status: 'idle' })}
      />
    ),

    saving: () => 'Saving...',
  };

  const views = {
    idle: () => memoizedLiveCodeExample,
    loading: () => 'Loading saved code snippet...',
    loadFailure: () => (
      <div className={styles.previewWarning}>
        <h3>ERROR</h3>
        <p>
          Can't find snippet with ID <strong>{state.snippetId}</strong>
        </p>
        <button onClick={() => setState({ status: 'idle' })}>
          Reset Editor
        </button>
      </div>
    ),
  };

  return (
    <>
      <div className={styles.header}>{getView(headerViews, state.status)}</div>
      {getView(views, state.status)}
    </>
  );
};

export default Playground;
