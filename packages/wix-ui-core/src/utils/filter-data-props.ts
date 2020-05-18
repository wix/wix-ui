const acceptedPropsStart = 'data-';

export const filterDataProps = (props: object) => {
  const output = {};
  for (const key in props) {
    if (
      props.hasOwnProperty(key) &&
      key.length > acceptedPropsStart.length &&
      key.startsWith(acceptedPropsStart)
    ) {
      output[key] = props[key];
    }
  }
  return output;
};
