import ButtonTwo from "./buttonTwo";
import Registry from "@ui-autotools/registry";
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
