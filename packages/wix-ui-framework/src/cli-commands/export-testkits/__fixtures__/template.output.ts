
import {
  firstDriverFactory,
  FirstDriver
} from "../components\/First\/First.protractor.driver";
export const firstTestkitFactory = protractorTestkitFactoryCreator<
  FirstDriver
>(firstDriverFactory)

import {
  secondDriverFactory,
  SecondDriver
} from "../components\/Second\/Second.protractor.driver";
export const secondTestkitFactory = protractorTestkitFactoryCreator<
  SecondDriver
>(secondDriverFactory)

