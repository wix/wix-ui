import React, { Dispatch } from 'react';
import * as queryString from 'query-string';
import UploadExportSmall from 'wix-ui-icons-common/UploadExportSmall';

import LiveCodeExample from '../LiveCodeExample';
import { Props as LiveCodeExampleProps } from '../LiveCodeExample/LiveCodeExample';
import TextButton from '../TextButton';
import { formatCode } from '../LiveCodeExample/format-code';

import styles from './styles.scss';

import { previewWarning } from './preview-warning';
import { saveSnippet, loadSnippet } from './snippet';
import { SaveSuccess } from './save-success';

const enum ViewState {
  Idle,
  Loading,
  Saving,
  SaveSuccess,
  SaveFailure,
  LoadFailure,
}

interface State {
  editorCode: string;
  loadedCode: string;
  viewState: ViewState;
  snippetId: string;
  showPreviewWarning: boolean;
}

interface Props extends LiveCodeExampleProps {
  formatSnippetUrl(snippetId: string): string;
}

const getView = (views, view) => (views[view] || views.idle)();

let dirty = false;

const Playground: React.FunctionComponent<Props> = ({
  initialCode = '',
  formatSnippetUrl,
  ...rest
}) => {
  const initialState: State = {
    editorCode: formatCode(initialCode),
    loadedCode: formatCode(initialCode),
    viewState: ViewState.Idle,
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
      setState({ viewState: ViewState.Loading });
      loadSnippet(snippetId)
        .then(loaded =>
          setState({
            loadedCode: formatCode(loaded.code),
            viewState: ViewState.Idle,
            showPreviewWarning: !loaded.isSafe,
            snippetId,
          }),
        )
        .catch(error => {
          console.log(error);
          setState({ viewState: ViewState.LoadFailure, snippetId });
        });
    }

    window.addEventListener('beforeunload', event => {
      if (dirty) {
        event.returnValue = 'Sure you want to leave?';
      }
    });
  }, []);

  const memoizedLiveCodeExample = React.useMemo(
    () => (
      <LiveCodeExample
        initialCode={state.loadedCode}
        previewWarning={state.showPreviewWarning ? previewWarning : null}
        onChange={(editorCode: string) => {
          const formatted = formatCode(editorCode);
          dirty = formatted !== state.loadedCode;
          setState({
            editorCode: formatted,
          });
        }}
        {...rest}
      />
    ),
    [state.loadedCode],
  );

  const headerViews = {
    idle: () => (
      <TextButton
        onClick={() => {
          setState({ viewState: ViewState.Saving });
          saveSnippet(state.editorCode)
            .then(snippetId =>
              setState({ snippetId, viewState: ViewState.SaveSuccess }),
            )
            .catch(error => {
              console.error('Unable to save snippet', error);
              setState({ viewState: ViewState.SaveFailure });
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
        onClose={() => setState({ viewState: ViewState.Idle })}
      />
    ),

    saving: () => 'Saving...',

    // don't render anything in header if loading failed
    loadFailure: () => null,

    saveFailure: () => (
      <>
        Unable to save sippet :(
        <TextButton onClick={() => setState({ viewState: ViewState.Idle })}>
          Try again
        </TextButton>
      </>
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
          onClick={() => setState({ viewState: ViewState.Idle })}
        >
          Reset Editor
        </button>
      </div>
    ),
  };

  return (
    <>
      <div className={styles.header}>
        {getView(headerViews, state.viewState)}
      </div>
      {getView(views, state.viewState)}
    </>
  );
};

export default Playground;
