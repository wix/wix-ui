import * as React from "react";
import { tab, tabs, example } from "../../src/Sections";

export default {
  category: "Sections",
  storyName: "Component with example section",
  sections: [
    tabs([
      tab({
        title: "The title",
        sections: [
          example({
            title: "hey title",
            text: "This is description",
            source: "<div>hello world</div>"
          }),

          example({
            title: "hey title",
            text: "This is description",
            source: "<div>hello world</div>",
            compact: false
          }),

          example({
            title: "hey title",
            text: "This is description",
            source: "<Test/>",
            darkBackground: true,
            initiallyOpen: true,
            components: {
              Test: () => <div>I'm test component</div>
            }
          })
        ]
      })
    ])
  ]
};
