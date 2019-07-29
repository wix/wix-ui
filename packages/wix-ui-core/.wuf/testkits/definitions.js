// Contents in this file are used in .wuf/testkits/*.template.ejs

module.exports = {
  "address-input": { pascalCase: true },
  "button-next": { noProtractorDriver: true },
  "circular-progress-bar": { pascalCase: true },
  "dropdown-content": { pascalCase: true },
  "dropdown-option": { pascalCase: true },
  "ellipsis-tooltip": { noVanillaDriver: true, noProtractorDriver: true },
  "file-picker-button": { noVanillaDriver: true, noProtractorDriver: true },
  "icon-with-options": { pascalCase: true, noProtractorDriver: true },
  "input-with-options": { pascalCase: true },
  "label-with-options": { pascalCase: true },
  "linear-progress-bar": { pascalCase: true },
  "media-image": { noProtractorDriver: true },
  "menu-item": { noProtractorDriver: true },
  "nav-stepper": { pascalCase: true },
  "radio-button": { pascalCase: true },
  "time-picker": { pascalCase: true },
  "toggle-switch": { pascalCase: true },
  autocomplete: { pascalCase: true },
  avatar: { noProtractorDriver: true },
  badge: {
    deprecated: true,
    vanillaDriverPath:
      "./../dist/src/components/deprecated/stylable-badge/Badge.driver",
    protractorDriverPath:
      "./../dist/src/components/deprecated/stylable-badge/Badge.protractor.driver"
  },
  button: { deprecated: true, pascalCase: true },
  captcha: { pascalCase: true, noProtractorDriver: true },
  checkbox: { pascalCase: true },
  divider: { deprecated: true, pascalCase: true },
  dropdown: { pascalCase: true },
  image: { noProtractorDriver: true },
  input: { pascalCase: true },
  label: { deprecated: true, pascalCase: true },
  loadable: { pascalCase: true, noProtractorDriver: true },
  pagination: { pascalCase: true },
  popover: { pascalCase: true },
  slider: { pascalCase: true },
  stepper: { noVanillaDriver: true, noProtractorDriver: true },
  thumbnail: { pascalCase: true },
  tooltip: { pascalCase: true },
  video: { pascalCase: true, noProtractorDriver: true }
};
