import React, { Dispatch } from 'react';
import * as queryString from 'query-string';
import UploadExportSmall from 'wix-ui-icons-common/UploadExportSmall';
import Close from 'wix-ui-icons-common/system/Close';

import { formatCode } from '../LiveCodeExample/format-code';
import LiveCodeExample from '../LiveCodeExample';
import { Props as LiveCodeExampleProps } from '../LiveCodeExample/LiveCodeExample';
import TextButton from '../TextButton';
import { CopyButton } from '../CopyButton';
import LinkSmall from 'wix-ui-icons-common/LinkSmall';
import styles from './styles.scss';

const snippetDatastoreUrl = `https://www.wix.com/_serverless/wix-style-react-playground/snippet`;

const loadSnippet = async (snippetId: string) => {
  try {
    const response = await fetch(`${snippetDatastoreUrl}/${snippetId}`);
    const { isSafe, code } = await response.json();

    if (code && code.trim().length) {
      return {
        code: formatCode(code),
        isSafe,
      };
    }

    return Promise.reject(`Invalid code snippet loaded: ${code}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveSnippet = async (code: string): Promise<string> => {
  try {
    const response = await fetch(snippetDatastoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: code }),
    });

    if (response.status === 200) {
      const { id } = await response.json();
      return id;
    }

    return Promise.reject(response.statusText);
  } catch (error) {
    return Promise.reject(error);
  }
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
      <input
        onClick={e => (e.target as HTMLInputElement).select()}
        className={styles.urlPreview}
        readOnly
        type="text"
        value={url}
      />
      <CopyButton
        className={styles.copyButton}
        prefixIcon={<LinkSmall />}
        source={url}
      />
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
        .then(loaded =>
          setState({
            loadedCode: loaded.code,
            status: 'idle',
            showPreviewWarning: !loaded.isSafe,
          }),
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
    idle: () => (
      <TextButton
        onClick={() => {
          setState({ status: 'saving' });
          void saveSnippet(state.editorCode)
            .then(snippetId => setState({ snippetId, status: 'saveSuccess' }))
            .catch(error => {
              console.error('Unable to save snippet', error);
              setState({ status: 'saveFailure' });
            });
        }}
        disabled={state.editorCode === state.loadedCode}
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

    // don't render anything in header if loading failed
    loadFailure: () => null,

    saveFailure: () => (
      <div>
        Unable to save sippet :(
        <TextButton onClick={() => setState({ status: 'idle' })}>
          Try again
        </TextButton>
      </div>
    ),
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
