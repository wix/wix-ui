const acceptedPropsStart = 'data-';

export const filterDataProps = (props: object) =>
  Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        key.length > acceptedPropsStart.length &&
        key.startsWith(acceptedPropsStart),
    ),
  );
