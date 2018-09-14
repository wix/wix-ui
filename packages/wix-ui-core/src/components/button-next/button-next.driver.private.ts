import { UniDriver } from "unidriver";

export interface ButtonNextPrivateDriver {
  suffixExists: () => Promise<boolean>;
  prefixExists: () => Promise<boolean>;
}

export const buttonNextPrivateDriverFactory = (
  base: UniDriver
): ButtonNextPrivateDriver => {
  return {
    suffixExists: async () => await base.$('[data-hook="suffix"]').exists(),
    prefixExists: async () => await base.$('[data-hook="prefix"]').exists()
  };
};
