import ButtonTwo from "./buttonTwo";
import Registry from "@ui-autotools/registry";
import { backOfficeTheme } from "../../themes/backoffice";
import { Icon } from "./mocks/Icon";

const buttonMetadata = Registry.getComponentMetadata(ButtonTwo);

buttonMetadata.addSim({
  title: "Simulation with suffix icon",
  props: {
    suffixIcon: Icon,
    children: "Button"
  }
});

buttonMetadata.addSim({
  title: "Simulation with prefix icon",
  props: {
    prefixIcon: Icon,
    children: "Button"
  }
});

buttonMetadata.addSim({
  title: "Simulation with prefix and suffix icon",
  props: {
    prefixIcon: Icon,
    suffixIcon: Icon,
    children: "Button"
  }
});

buttonMetadata.exportedFrom({
  path: "../Button", // the path to your component, relative to the root, and without file extension
  exportName: "Button", // the name under which you export your component
  baseStylePath: "../Button/button.st.css" // the path to the base stylesheet for the component (as opposed to themes)
});

// Themes can be registered like so:
buttonMetadata.addStyle(backOfficeTheme, {
  name: "boTheme",
  path: "../../themes/backoffice/theme.st.css"
});
