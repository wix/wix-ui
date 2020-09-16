import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "wix-ui-icons-common",
  brandUrl:
    "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common",
});

addons.setConfig({
  theme,
  showPanel: false,
  isFullscreen: false,
  storySort: undefined,
  isToolshown: true,
});
