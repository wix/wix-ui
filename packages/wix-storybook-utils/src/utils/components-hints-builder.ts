import parsePropTypes from 'parse-prop-types';
import omit from 'lodash/omit';

type ComponentsScope = Record<string, any>;

const isUpperCaseLetter = char => /[A-Z]/.test(char);

const getCompoundComponents = (
  componentsScope: ComponentsScope,
  componentName: string,
) => {
  const component = componentsScope[componentName];

  return Object.keys(component).reduce((result, componentProperty) => {
    if (isUpperCaseLetter(componentProperty[0])) {
      return {
        ...result,
        [`${componentName}.${componentProperty}`]: component[componentProperty],
      };
    }
    return result;
  }, {});
};

const getParsedComponent = (
  componentsScope: ComponentsScope,
  componentName: string,
) => {
  const component = componentsScope[componentName];

  if (!component.propTypes && !component.displayName) {
    return {};
  }

  const parsedPropTypes = parsePropTypes(component);
  const filteredPropTypes = omit(parsedPropTypes, 'children', 'className');
  const propNames = Object.keys(filteredPropTypes);

  return {
    [componentName]: {
      attrs: Object.assign(
        {},
        ...propNames.sort().map(propName => {
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
};

const getCompoundComponentsHints = (
  componentsScope: ComponentsScope,
  componentName: string,
) => {
  const compoundComponents = getCompoundComponents(
    componentsScope,
    componentName,
  );

  return Object.keys(compoundComponents)
    .sort()
    .reduce(
      (result, compoundComponentName) => ({
        ...result,
        ...getParsedComponent(compoundComponents, compoundComponentName),
      }),
      {},
    );
};

export const getComponentsHints = (componentsScope?: ComponentsScope) => {
  if (!componentsScope) {
    return null;
  }

  return Object.keys(componentsScope)
    .sort()
    .reduce(
      (result, componentName) => ({
        ...result,
        ...getParsedComponent(componentsScope, componentName),
        ...getCompoundComponentsHints(componentsScope, componentName),
      }),
      {},
    );
};
