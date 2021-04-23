import parsePropTypes from 'parse-prop-types';
import omit from 'lodash/omit';

type Scope = Record<string, any>;

const isUpperCaseLetter = char => /[A-Z]/.test(char);

const getCompoundComponents = (scope: Scope, componentName: string) => {
  const component = scope[componentName];

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

const getParsedComponent = (scope: Scope, componentName: string) => {
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
};

const getCompoundComponentsHints = (
  scope: Record<string, any>,
  componentName: string,
) => {
  const compoundComponents = getCompoundComponents(scope, componentName);

  return Object.keys(compoundComponents)
    .sort()
    .reduce(
      (result, componentName1) => ({
        ...result,
        ...getParsedComponent(compoundComponents, componentName1),
      }),
      {},
    );
};

export const getHints = (scope: Scope) => {
  if (!scope) {
    return null;
  }

  return Object.keys(scope)
    .sort()
    .reduce(
      (result, componentName) => ({
        ...result,
        ...getParsedComponent(scope, componentName),
        ...getCompoundComponentsHints(scope, componentName),
      }),
      {},
    );
};
