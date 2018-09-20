import { UniDriver } from "unidriver";
import {
  buttonNextDriverFactory as publicButtonDriver,
  ButtonNextDriver
} from "./button-next.driver";

export interface ButtonNextPrivateDriver extends ButtonNextDriver {
  suffixExists: () => Promise<boolean>;
  prefixExists: () => Promise<boolean>;
}

export const buttonNextPrivateDriverFactory = (
  base: UniDriver
): ButtonNextPrivateDriver => {
  return {
    ...publicButtonDriver(base),
    suffixExists: async () => await base.$('[data-hook="suffix"]').exists(),
    prefixExists: async () => await base.$('[data-hook="prefix"]').exists()
  };
};
