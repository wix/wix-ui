import {
  UniDriver,
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/unidriver';

export interface IVideoDriver extends BaseUniDriver {
  /** returns player name */
  getPlayerName: () => Promise<string>;
}

export const videoDriverFactory = (base: UniDriver): IVideoDriver => {
  return {
    ...baseUniDriverFactory(base),
    getPlayerName: async () => await base.$('[data-player-name]').attr('data-player-name'),
  };
};
