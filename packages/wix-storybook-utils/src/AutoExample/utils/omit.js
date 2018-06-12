export default object => predicate =>
  Object
    .entries(object)
    .reduce(
      (result, [key, value]) =>
        predicate(key, value) ? result : {...result, [key]: value},
      {}
    );

