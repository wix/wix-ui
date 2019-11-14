declare namespace __WSRTests {
  interface CardGalleryItemUniDriver extends BaseUniDriver {
    getTitle: () => Promise<string | null>;
    getBadge: () => Promise<any>;
    getSubtitle: () => Promise<string | null>;
    getBackgroundImageUrl: () => Promise<string | null>;
    getPrimaryActionLabel: () => Promise<string>;
    isPrimaryActionDisabled: () => Promise<boolean>;
    clickOnPrimaryAction: () => Promise<void>;
    getSecondaryActionLabel: () => Promise<string>;
    clickOnSecondaryAction: () => Promise<void>;
    getSettingsMenu: () => Promise<any>;
    getBackgroundImageNode: () => Promise<any>;
    hover: () => Promise<void>;
  }
}
