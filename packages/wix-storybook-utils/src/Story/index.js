import React from 'react';
import PropTypes from 'prop-types';

import TextLink from 'wix-style-react/TextLink';
import Loader from 'wix-style-react/Loader';

import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';
import AutoDocs from '../AutoDocs';
import AutoExample from '../AutoExample';
import TabbedView from '../TabbedView';
import ComponentMetaInfoGetter from '../ComponentMetaInfoGetter';

import styles from './styles.scss';

const isE2E = global.self === global.top;

/**
 * # `story()`
 *
 * function that given small configuration object will create all the documentation you need.
 *
 * Minimum example:
 *
 * ```js
 * story({
 *   category: 'Core',
 *   componentSrcFolder: 'ToggleSwitch'
 * });
 * ```
 *
 * * __category__ `string` - name of storybook section the story should be put under
 * * __componentSrcFolder__ `string` - "relative" path to component. Path is resolved against `src` folder.
 *
 * This should be enough for majority of cases.
 * Refer to API table below for more configuration.
 *
 * under the hood uses `<AutoDocs/>`, `<AutoExample/>` & some black magic.
 */
function Story(props) {
  const {
    category,
    name: customName,
    readme: customReadme,
    readmeTestkit: customReadmeTestKit,
    readmeAccessibility: customReadmeAccessibility,
    source: customSource,
    component: customComponent,
    componentSrcFolder,
    storyName = customName || componentSrcFolder,
    componentProps,
    examples,
    exampleProps,
    storiesOf, // eslint-disable-line
    contextualImport, // eslint-disable-line
    rawContextualImport // eslint-disable-line
  } = props;

  if (typeof componentSrcFolder === 'undefined') {
    const allRequiredPropsPresent = customName && customSource && customComponent;
    if (!allRequiredPropsPresent) {
      console.error('Props with error:', props);
      throw new Error('Error: "componentSrcFolder" is undefined in story function. In such case, you must supply the following params yourself: "name", "source", "component".');
    }
  }

  if (typeof storyName === 'undefined') {
    console.error('Props with error:', props);
    throw new Error('Error: unable to fully parse given component. Please provide either "storyName" or "name" to the story function.');
  }


  storiesOf(category, module).add(storyName, () => (
    <ComponentMetaInfoGetter
      contextualImport={contextualImport}
      rawContextualImport={rawContextualImport}
      componentSrcFolder={componentSrcFolder}
      showStoryContent={
        params => {
          const {
            isLoading,
            source,
            readmeTestKit,
            readmeAccessibility,
            component,
            name = customName || (component && (component.displayName || component.name)),
            readme,
            parsedSource
          } = params;

          const actualSource = customSource || source;
          const actualReadmeTestKit = customReadmeTestKit || readmeTestKit;
          const actualComponent = customComponent || component;
          const actualReadme = customReadme || readme;
          const actualReadmeAccessibility = customReadmeAccessibility || readmeAccessibility;

          if (isLoading) {
            return (
              <div className={styles.loaderWrapper}>
                <Loader text="Loading component meta-data, please, wait..."/>
              </div>
            );
          }

          const tabs = [
            'Usage',
            'API',
            ...(actualReadmeTestKit ? ['Testkit'] : []),
            ...(actualReadmeAccessibility ? ['Accessibility'] : [])
          ];

          if (isE2E) {
            return (
              <div>
                <AutoExample
                  isInteractive={false}
                  ref={ref => global.autoexample = ref}
                  component={actualComponent}
                  source={actualSource}
                  componentProps={componentProps}
                  />

                {examples}
              </div>
            );
          }

          return (
            <TabbedView tabs={tabs}>
              <div className={styles.usage}>
                {actualReadme ?
                  <Markdown source={actualReadme}/> :
                  <Markdown source={`# \`<${name}/>\``}/>
                }

                {name &&
                <div className={styles.githubLink}>
                  <TextLink
                    link={`https://github.com/wix/wix-style-react/blob/master/src/${name}`}
                    target="_blank"
                    >
                    View source on GitHub
                  </TextLink>
                </div>
                }

                {name && <CodeBlock source={`import ${name} from 'wix-style-react/${name}';`}/>}

                {actualComponent && actualSource &&
                <AutoExample
                  component={actualComponent}
                  source={actualSource}
                  componentProps={componentProps}
                  parsedSource={parsedSource}
                  exampleProps={exampleProps}
                  />
                }

                {examples}
              </div>

              {actualSource && <AutoDocs source={actualSource} parsedSource={parsedSource}/>}

              {actualReadmeTestKit && <Markdown source={actualReadmeTestKit}/>}

              {actualReadmeAccessibility && <Markdown source={actualReadmeAccessibility}/>}
            </TabbedView>
          );
        }
      }
      />
  ));

  // need to return some JSX in order to get "react-docgen" parser working
  return <p>dummy</p>;
}

Story.propTypes = {
  /**
   * Name of Storybook "section" under which this story will be placed (e.g. `Core`, `6. Navigation`, `3. Inputs`)
   */
  category: PropTypes.string.isRequired,

  /**
   * Name of the component, used as story title, as part of `import` example and as part of link to source on github
   *
   * if not specified, `displayName` or `name` of class or function will be used instead.
   */
  name: PropTypes.string,

  /**
   * Name of the story in sidebar.
   * Default value will be used from property `name` (see above) or, if you didn't provided the name, it will take the value from property `componentSrcFolder`.
   *
   */
  storyName: PropTypes.string,

  /**
   * the README.md file in your component folder.
   *
   * A markdown-compatible string to be printed above interactive component example.
   * should be resolved automatically.
   * If somehow it doesn't work automatically, you can provide readme yourself.
   */
  readme: PropTypes.string,

  /**
   * the README.TESTKIT.md file in your component folder.
   *
   * A markdown-compatible string to be printed within "TestKit" tab.
   * No "TestKit" tab will displayed if this property is not provided.
   *
   * should be resolved automatically.
   * If somehow it doesn't work automatically, you can provide readme yourself.
   */
  readmeTestkit: PropTypes.string,

  /**
   * the README.ACCESSIBILITY.md file in your component folder.
   *
   * A markdown-compatible string to be printed within "Accessibility" tab.
   * No "Accessibility" tab will displayed if this property is omitted.
   *
   * should be resolved automatically.
   * If somehow it doesn't work automatically, you can provide accessibility readme yourself.
   */
  readmeAccessibility: PropTypes.string,

   /**
   * Raw source of component as a string.
   * should be resolved automatically by trying to import source of component using `!raw-loader!` and `webpack`'s dynamic `import()`.
   *
   * If somehow it doesn't work automatically, you can provide source yourself:
   * * Use `!raw-loader!` to get it, e.g.: `import source from '!raw-loader!wix-style-react/ColorPicker/color-picker';`
   * * Beware that the actual source is required and not just something like `export {default} from './component.js'`
   */
  source: PropTypes.string,

  /**
   * Reference to react component which will be used in interactive example
   * should be resolved automatically.
   *
   * If somehow it doesn't work automatically, you can provide component yourself:
   * * __component__ - it will import component using `webpack`'s dynamic `import()`
   */
  component: PropTypes.element,

  /**
   * The relative (for the `src` folder) path to the component.
   *
   * E.g. for the component `Button` located in `/src/Backoffice/Button/index.js`
   * this property should be set to `'Backoffice/Button'`
   *
   */
  componentSrcFolder: PropTypes.string,

  /**
   * Props that will be used within `component`. Either given as-is with `object` or computed in `function`.
   *  * when `object`, it will be given to `component` as props. This is the place to set any props that are required by `component`
   *  * when `function`, its signature is `(setProps, getProps) => props` where:
   *    * `setProps` - `function`: accepts one argument - object. When called this object will be set as `componentProps`
   *    * `getProps` - `function`: does not accept anything. When called it will return an object containing currently used props
   *    * `props` - return value `object`: whatever is returned will be used as new `componentProps`
   *               This is used to allow dynamic changes from within `component`. The return value of this function will be used as `component` props.

   For example:

    ```js
    // 1. `componentProps` as object
    story({
      name: 'ToggleSwitch',
      // ...{other props}
      componentProps: {
        onChange: () => console.log('Danger! Component was changed!')
      }
    })
    // The component inside __story__ function will behave the same as:
    <ToggleSwitch onChange={() => console.log('Danger! Component was changed!')}/>


    // 2. `componentProps` as function
    story({
      name: 'ToggleSwitch',
      // ...{other props}
      componentProps: (setProps, getProps) => ({
        checked: false,
        onChange: () => setProps({checked: !getProps().checked})
      }),
    })
    ```
   */
  componentProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /**
   * Any react component to be displayed below interactive component example.
   * Usually this holds more examples.
   */
  examples: PropTypes.element,
  exampleProps: PropTypes.object
};

Story.defaultProps = {
  componentProps: {},
  examples: null
};

export default Story;
