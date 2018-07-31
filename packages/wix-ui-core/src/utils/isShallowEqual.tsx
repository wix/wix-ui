export const isShallowEqual = (v, o) => {
  for (const key in v) {
    if (!(key in o) || v[key] !== o[key]) {
      return false;
    }
  }

  for (const key in o) {
    if (!(key in v) || v[key] !== o[key]) {
      return false;
    }
  }

  return true;
}
