import * as React from "react";
import { Avatar } from "./avatar";
import Registry from "@ui-autotools/registry";

const avatarMetadata = Registry.getComponentMetadata(Avatar);

avatarMetadata.addSim({
  title: "default",
  props: {
    name: 'John Doe'
  }
});
