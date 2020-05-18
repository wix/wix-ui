const acceptedPropsStart = 'data-';

export const filterDataProps = (props: object) => {
  const output = {};
  for (const key in props) {
    if (
      key.length > acceptedPropsStart.length &&
      key.startsWith(acceptedPropsStart)
    ) {
      output[key] = props[key];
    }
  }
  return output;
};
