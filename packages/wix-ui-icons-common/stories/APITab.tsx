import { tab, description } from "wix-storybook-utils/Sections";

const API_Table = `
| Name | Type | Default Value | Required | Description |
| --- | --- | --- | --- | --- |
| className | string |  |   | Set custom class to svg root of icon |
| size | string |  |   | Set the size of the icon |
| style | object |  |   | Set style object to svg root of icon |
| ***All other Props are passed to the SVG element*** | | | | |
`;

export default tab({
  title: "API",
  sections: [description({ title: "Props", text: API_Table })],
});
