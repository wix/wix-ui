declare namespace __WSRTests {
  interface SortableListDriver extends BaseDriver {
    reorder: (data: {
      removedId: number | string;
      addedId: number | string;
    }) => void;
  }
}
