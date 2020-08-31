import { addParameters, configure } from "@storybook/react";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "wix-ui-icons-common",
  brandUrl:
    "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common",
});

// Parameters
addParameters({
  options: {
    theme,
    showPanel: false,
    isFullscreen: false,
    storySort: undefined,
    isToolshown: true,
  },
});

const loadStories = () => {
  require("../stories/index.story");
  require("../stories/system.story");
};

configure(loadStories, module);
