import React, { Dispatch } from 'react';
import parsePropTypes from 'parse-prop-types';
import omit from 'lodash/omit';
import * as queryString from 'query-string';
import UploadExportSmall from '../icons/UploadExportSmall';

import LiveCodeExample from '../LiveCodeExample';
import { Props as LiveCodeExampleProps } from '../LiveCodeExample/LiveCodeExample';
import TextButton from '../TextButton';
import { formatCode } from '../LiveCodeExample/doctor-code';

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

const getView = (views, view) => (views[view] || views[ViewState.Idle])();

let dirty = false;

const isUpperCaseLetter = (char) => (/[A-Z]/.test(char));

const getCompoundComponents = (scope, componentName) => {
  const component = scope[componentName];

  return Object.keys(component).reduce((result, componentProperty) => {
    if (isUpperCaseLetter(componentProperty[0])) {
      return {
        ...result,
        [`${componentName}.${componentProperty}`]: component[componentProperty]
      }
    }
    return result;
  }, {})
}

const getParsedComponent = (scope, componentName) => {
  console.log(scope, componentName)
  const component = scope[componentName];

  if (!component.propTypes) {
    return {};
  }

  const parsedPropTypes = parsePropTypes(component);
  const filteredPropTypes = omit(parsedPropTypes, 'children', 'className');
  const propNames = Object.keys(filteredPropTypes);

  return {
    [componentName]: {
      attrs: Object.assign(
        {},
        ...propNames.map(propName => {
          const propType = filteredPropTypes[propName].type;

          return {
            [propName]:
              propType.name === 'oneOf'
                ? propType.value.filter((x: any) => typeof x === 'string')
                : null,
          };
        }),
      ),
    },
  };
}

const getCompoundComponentsHints = (scope, componentName) => {
  const compoundComponents = getCompoundComponents(scope, componentName);

  return Object.keys(compoundComponents)
    .sort()
    .reduce((result, componentName1) => ({
      ...result,
      ...getParsedComponent(compoundComponents, componentName1),
    }), {});
};

const getHints = scope => {
  console.log('SCOPE');
  console.log(scope);

  const hints = Object.keys(scope)
    .sort()
    .reduce((result, componentName) => ({
      ...result,
      ...getParsedComponent(scope, componentName),
      ...getCompoundComponentsHints(scope, componentName),
    }), {});

  console.log(hints)
  return hints;
};

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

    const onBeforeUnload = event => {
      if (dirty) {
        event.returnValue = 'Sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
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
        previewProps={{ className: styles.overflowPreview }}
        hints={getHints(rest.scope)}
        {...rest}
      />
    ),
    [state.loadedCode],
  );

  const headerViews = {
    [ViewState.Idle]: () => (
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

    [ViewState.SaveSuccess]: () => (
      <SaveSuccess
        snippetId={state.snippetId}
        formatUrl={formatSnippetUrl}
        onClose={() => setState({ viewState: ViewState.Idle })}
      />
    ),

    [ViewState.Saving]: () => 'Saving...',

    // don't render anything in header if loading failed
    [ViewState.LoadFailure]: () => null,

    [ViewState.SaveFailure]: () => (
      <>
        Unable to save sippet :(
        <TextButton onClick={() => setState({ viewState: ViewState.Idle })}>
          Try again
        </TextButton>
      </>
    ),
  };

  const views = {
    [ViewState.Idle]: () => memoizedLiveCodeExample,
    [ViewState.Loading]: () => 'Loading saved code snippet...',
    [ViewState.LoadFailure]: () => (
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
