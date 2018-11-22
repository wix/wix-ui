export function intersection(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return [];
  }
  const uniqueArray1 = createUniqueArray(array1);
  const uniqueArray2 = createUniqueArray(array2);
  return uniqueArray1.filter(value => uniqueArray2.indexOf(value) !== -1);
}

const createUniqueArray = array => array.filter((elem, index, self) => index === self.indexOf(elem));
