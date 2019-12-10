declare namespace __WSRTests {
  interface NestableListDriver extends BaseDriver {
    reorder: (
      data: { removedId: number | string; addedId: number | string },
      offset: { x: number; y: number }
    ) => void;
    drag: (removedId: number | string) => void;
  }
}
