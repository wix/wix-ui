import React, { Dispatch } from 'react';
import * as queryString from 'query-string';
import UploadExportSmall from 'wix-ui-icons-common/UploadExportSmall';
import LinkSmall from 'wix-ui-icons-common/LinkSmall';
import Close from 'wix-ui-icons-common/system/Close';

import LiveCodeExample from '../LiveCodeExample';
import { Props as LiveCodeExampleProps } from '../LiveCodeExample/LiveCodeExample';
import TextButton from '../TextButton';
import { CopyButton } from '../CopyButton';

import styles from './styles.scss';

import { previewWarning } from './preview-warning';
import { saveSnippet, loadSnippet } from './snippet';

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
    const snippetId =
      (queryString.parse(window.location.search).snippet as string) || null;

    if (snippetId) {
      setState({ status: 'loading' });
      void loadSnippet(snippetId)
        .then(loaded =>
          setState({
            loadedCode: loaded.code,
            status: 'idle',
            showPreviewWarning: !loaded.isSafe,
            snippetId,
          }),
        )
        .catch(error => {
          console.log(error);
          setState({ status: 'loadFailure', snippetId });
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
        <h3>Error!</h3>
        <p>
          Tried to load snippet ID <strong>{state.snippetId}</strong> but did
          not find it.
        </p>
        <button
          className={styles.previewConfirmButton}
          onClick={() => setState({ status: 'idle' })}
        >
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
