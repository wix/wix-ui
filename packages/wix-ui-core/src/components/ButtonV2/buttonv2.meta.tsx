import * as React from "react";
import { ButtonV2 } from "./buttonv2";
import Registry from "@ui-autotools/registry";
import { boTheme } from "../../themes/backoffice";

const Icon = (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.026 11L11 0h.974L12 11h11v1H12l-.026 11H11l.026-11H0v-1z" />
  </svg>
);

const buttonMetadata = Registry.getComponentMetadata(ButtonV2);

buttonMetadata.addSim({
  title: "Simulation with suffix icon",
  props: {
    suffixIcon: Icon
  }
});

buttonMetadata.addSim({
  title: "Simulation with prefix icon",
  props: {
    prefixIcon: Icon
  }
});

buttonMetadata.addSim({
  title: "Simulation with prefix and suffix icon",
  props: {
    prefixIcon: Icon,
    suffixIcon: Icon
  }
});

buttonMetadata.exportedFrom({
  path: "../ButtonV2", // the path to your component, relative to the root, and without file extension
  exportName: "Button", // the name under which you export your component
  baseStylePath: "../ButtonV2/buttonv2.st.css" // the path to the base stylesheet for the component (as opposed to themes)
});

// Themes can be registered like so:
buttonMetadata.addStyle(boTheme, {
  name: "boTheme",
  path: "../../themes/backoffice/theme.st.css"
});
