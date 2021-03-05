import React from 'react';
import {  header,
  divider,
  tabs,
  tab,
  title,
  importExample,
  api,
  testkit,
  playground,
  description,
  example as baseExample
} from "../../src/Sections";
import Component from '../Component'

const example = config => baseExample({  ...config });

export default {
  category: "StoryStructure",
  storyName: "Component",
  component: Component,
  componentPath: '../Component.js',
  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl: 'https://github.com/wix/wix-style-react/tree/master/src/Input',
    }),
    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text: `
            Input allows to insert short text values. This component is used in submit forms or to build other form components like \`<Autocomplete/>\` or \`<NumberInput/>\`.<br/>
            Use it:<br/>
            &emsp;- To insert names, titles and other short textual information.<br/>
            &emsp;- To build custom inputs like Credit Card input.<br/>
            Don’t use it:<br/>
            &emsp;- To insert long paragraphs, instead use the <InputArea/> component.<br/>
            &emsp;- As a search input, instead use the <Search/> component.<br/>
            `,
          }),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Size',
            text: `
              Adjust the component size using \`size\` prop. It supports 3 sizes:<br/>
              <ul>
                <li>\`large\` - use it in onboarding flows, where input needs emphasis.</li>
                <li> \`medium\` (default) - use in all common cases. </li>
                <li> \`small\` - use in more dense and narrow layouts. </li>
              </ul>
            `,
            source: "<div style={{ height: '100px' }}><div/><div/><div/></div>",
          }),

          example({
            title: 'Border',
            text: `
              Style the component using \`border\` prop. It supports 3 styles:<br/>
              &emsp;- \`default\` - use in all common cases.<br/>
              &emsp;- \`round\` (default) - use to build filter inputs, like search.<br/>
              &emsp;- \`bottomLine\` - use as a title which can be edited on the click.<br/>
            `,
            source: "<div style={{ height: '150px' }}><div/><div/><div/></div>",
          }),

          example({
            title: 'Status',
            text: `
            Control component status using \`status\` prop. It supports 3 states:<br/>
              &emsp;- \`error\` - use to highlight invalid input value.<br/>
              &emsp;- \`warning\` - use to highlight inputs that values impact user business or can’t be validated.<br/>
              &emsp;- \`loading\` - use to show that the value is being uploaded to the server.<br/>
            `,
            source: "<div style={{ height: '50px' }}><div/><div/><div/></div>",
          }),

          example({
            title: 'Status Message',
            text: `
              Explain the status with \`statusMessage\` prop. The message is revealed when a user mouse hovers the status icon.
              The placement of a tooltip is controlled with \`tooltipPlacement\` prop.
            `,
            source: "<div style={{ height: '100px' }}><div/><div/><div/></div>",
          }),

          example({
            title: 'Read-Only and Disabled',
            text: `
              Control input interaction with:<br/>
              &emsp;- \`readOnly\` - disables writing new values, but allows to copy the current value. Use to display urls, codes and similar text.<br/>
              &emsp;- \`disabled\` - disables all input interactions. Use to highlight unavailable functions.<br/>
            `,
            source: "<div style={{ height: '100px' }}><div/><div/><div/></div>",
          }),

          example({
            title: 'Affix',
            text: `
              Support input value with additional information added to \`prefix\` and \`suffix\` props. 
              Props can contain text, icons and even buttons.
            `,
            source: "<div style={{ height: '100px' }}><div/><div/><div/></div>",
          }),

          example({
            title: 'Clear Button',
            text: `
              Enable a button that clears input value by using \`clearButton\` prop.
              Show it when input’s value is optional or often has to be clear, for example date and search inputs.
            `,
            source: "<div style={{ height: '100px' }}><div/><div/><div/></div>"
          }),

          example({
            title: 'Text Overflow',
            text: `
              Control long text value truncation with \`textOverflow\` prop. It has 2 options:<br/>
              &emsp;- \`clip\`(default) - ends the text  with a sharp cut.<br/>
              &emsp;- \`ellipsis\` - shows ellipsis where  text is truncated. Use to emphasize that text doesn’t fit, especially when \`bottomLine\` style is enabled.<br/>
            `,
            source: "<div style={{ height: '100px' }}><div/><div/><div/></div>",
          }),

          divider(),

          title('Common Use Cases'),

          example({
            title: 'Compound Input',
            text:
              'When multiple inputs represent the same data, like phone number or address input, fields can be stacked together using `Layout` component.',
            source: "<div style={{ height: '100px' }}><div/><div/><div/></div>",
          }),

          example({
            title: 'Input as a title',
            text:
              'Input can be used as a card title when its border is set to bottomLine. This pattern is great when it’s needed to give a control to quickly organize groups and files.',
            source: "<div style={{ height: '100px' }}><div/><div/><div/></div>",
          }),

          divider(),

          title('Feedback'),

          description(
            'You can help us improve this component by providing feedback, asking questions or leaving any  other comments via `#wix-style-ux` or `#wix-style-react` Slack channels or GitHub. Found a bug? Please report it to: <a href="https://goo.gl/forms/wrVuHnyBrEISXUPF2" target="_blank">goo.gl/forms/wrVuHnyBrEISXUPF2</a>',
          ),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
