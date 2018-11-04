import * as React from "react";
import Registry from "@ui-autotools/registry";

import { Avatar } from "./avatar";
import User from 'wix-ui-icons-common/User';

const avatarMetadata = Registry.getComponentMetadata(Avatar);

// TODO: use local asset. how is asset loading done in autotools?
const IMG_SRC_STUB = 'http://lorempixel.com/30/30/';

avatarMetadata.addSim({
  title: "Only name specified, generates initials text JD",
  props: {
    name: 'John Doe'
  }
});

avatarMetadata.addSim({
  title: "Only icon specified",
  props: {
    icon: <User/>
  }
});

avatarMetadata.addSim({
  title: "Only imgProps specified",
  props: {
    imgProps: {src: IMG_SRC_STUB}
  }
});
