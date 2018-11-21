import {intersection} from './intersection';

describe('intersection', () => {

  it('should return a new array which is the intersection of two arrays', () => {
    const array1 = [1,2,3];
    const array2 = [2,3,4];
    expect(intersection(array1, array2)).toEqual([2,3]);
  });

  it('should return a new array with no duplications which is the intersection of two arrays', () => {
    const array1 = [1,2,3,3];
    const array2 = [2,3,4,3];
    expect(intersection(array1, array2)).toEqual([2,3]);
  });

  it('should return a new array of objects which is the intersection of two arrays of objects', () => {
    const dummyObj = {id: '1111'};
    const array1 = [dummyObj, {id: '3333'}];
    const array2 = [dummyObj, {id: '4444'}];
    expect(intersection(array1, array2)).toEqual([dummyObj]);
  });

  it('should return an empty array if intersection not exist between two arrays', () => {
    const array1 = [5,6,7];
    const array2 = [2,3,4];
    expect(intersection(array1, array2)).toEqual([]);
  });

  it('should return an empty array if sending one of the arrays as null', () => {
    const array1 = [5,6,7];
    const array2 = null;
    expect(intersection(array1, array2)).toEqual([]);
  });

  it('should return an empty array if sending one of the arrays as undefined', () => {
    const array1 = undefined;
    const array2 = [5,6,7];
    expect(intersection(array1, array2)).toEqual([]);
  });

  it('should return an empty array if not sending array as one of the intersection parameter', () => {
    const array1 = 5;
    const array2 = [5,6,7];
    expect(intersection(array1, array2)).toEqual([]);
  });

});
