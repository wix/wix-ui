// Contents in this file are used in .wuf/testkits/*.template.ejs

module.exports = {
  "address-input": { pascalCase: true },
  "button-next": { unidriver: true, noProtractorDriver: true },
  "circular-progress-bar": { unidriver: true, pascalCase: true },
  "dropdown-content": { pascalCase: true },
  "dropdown-option": { pascalCase: true },
  "ellipsis-tooltip": { noVanillaDriver: true, noProtractorDriver: true },
  "file-picker-button": {
    unidriver: true,
    noVanillaDriver: true,
    noProtractorDriver: true,
    uniDriverPath:
      "./../dist/src/components/file-picker-button/test/FilePickerButton.uni.driver"
  },
  "icon-with-options": { pascalCase: true, noProtractorDriver: true },
  "input-with-options": { pascalCase: true },
  "label-with-options": { pascalCase: true },
  "linear-progress-bar": { unidriver: true, pascalCase: true },
  "media-image": { unidriver: true, noProtractorDriver: true },
  "menu-item": { unidriver: true, noProtractorDriver: true },
  "nav-stepper": { pascalCase: true },
  "radio-button": { pascalCase: true },
  "time-picker": { pascalCase: true },
  "toggle-switch": { pascalCase: true },
  autocomplete: { pascalCase: true },
  avatar: { unidriver: true, noProtractorDriver: true },
  badge: {
    deprecated: true,
    vanillaDriverPath:
      "./../dist/src/components/deprecated/stylable-badge/Badge.driver",
    protractorDriverPath:
      "./../dist/src/components/deprecated/stylable-badge/Badge.protractor.driver"
  },
  button: { deprecated: true, pascalCase: true },
  captcha: { unidriver: true, pascalCase: true, noProtractorDriver: true },
  checkbox: { pascalCase: true },
  divider: { deprecated: true, pascalCase: true },
  dropdown: { pascalCase: true },
  image: { unidriver: true, noProtractorDriver: true },
  input: { pascalCase: true },
  label: { unidriver: true, deprecated: true, pascalCase: true },
  loadable: { pascalCase: true, noProtractorDriver: true },
  pagination: { pascalCase: true },
  popover: { unidriver: true, pascalCase: true },
  slider: { pascalCase: true },
  stepper: { noVanillaDriver: true, noProtractorDriver: true },
  thumbnail: { pascalCase: true },
  tooltip: { unidriver: true, pascalCase: true },
  video: { unidriver: true, pascalCase: true, noProtractorDriver: true },
  "signature-input": {
    unidriver: true,
    noVanillaDriver: true,
    noProtractorDriver: true
  }
};
