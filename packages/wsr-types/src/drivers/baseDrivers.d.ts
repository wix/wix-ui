declare namespace __WSRTests {
  // TODO: types cannot be augmented, and I can't use
  // interface BaseDriver extends import('wix-ui-test-utils/driver-factory').BaseDriver {}
  // so I had ot redeclare those because if client would import 2 different test libraries
  // the type would be defined twice and result in an error

  // type BaseDriver = import('wix-ui-test-utils/driver-factory').BaseDriver;
  // type BaseUniDriver = import('wix-ui-test-utils/base-driver').BaseUniDriver;

  interface BaseDriver {
    exists: () => boolean;
  }

  interface BaseUniDriver {
    /** returns true if component exists */
    exists: () => Promise<boolean>;
    /** returns the component element */
    element: () => Promise<any>;
    /** click on the element */
    click: () => Promise<void>;
  }
}
