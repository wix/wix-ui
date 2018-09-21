import * as React from "react";
import { ButtonNext } from "./button-next";
import Add from "wix-ui-icons-common/Add";
import Registry from "@ui-autotools/registry";

const buttonMetadata = Registry.getComponentMetadata(ButtonNext);

buttonMetadata.addSim({
  title: "Simulation with suffix icon",
  props: {
    suffixIcon: <Add />,
    children: "Button"
  }
});

buttonMetadata.addSim({
  title: "Simulation with prefix icon",
  props: {
    prefixIcon: <Add />,
    children: "Button"
  }
});

buttonMetadata.addSim({
  title: "Simulation with prefix and suffix icon",
  props: {
    prefixIcon: <Add />,
    suffixIcon: <Add />,
    children: "Button"
  }
});
