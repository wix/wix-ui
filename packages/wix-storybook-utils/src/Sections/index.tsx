import * as React from 'react';

import { Meta } from '../typings/story-section';

import * as section from './section-builders';
import * as sectionRenderers from './section-renderers';

const sourceForThemes = theme => `
<Notification theme="${theme}" show>
  <Notification.TextLabel>${theme}</Notification.TextLabel>
  <Notification.CloseButton/>
</Notification>
`;

const wrapWithDiv = string =>
  `<div>
  ${string}
</div>`;

const meta: Meta = {
  title: 'Notification',
  subtitle: '<Notification/>',
  sourceUrl:
    'https://github.com/wix/wix-style-react/blob/master/src/Notification',
  issueUrl: 'https://github.com/wix/wix-style-react/issues/new',

  sections: [
    section.description({
      text:
        'A sticky toast bar that appears on top of the screen notifying about system changes.',
    }),

    section.importExample({
      source: `import Notification from 'wix-style-react/Notification'`,
    }),

    section.code({
      title: 'Themes',
      source: wrapWithDiv(
        ['standard', 'error', 'success', 'warning', 'premium'].reduce(
          (a, theme) => a.concat(sourceForThemes(theme).trim() + '\n'),
          '',
        ),
      ),
    }),

    section.code({
      title: 'Action',
      source: `<div>
      <Notification show>
  <Notification.TextLabel>This notification has</Notification.TextLabel>
  <Notification.ActionButton type="textLink">
    text link action
  </Notification.ActionButton>
  <Notification.CloseButton/>
</Notification>

<Notification show>
  <Notification.TextLabel>This notification has</Notification.TextLabel>
  <Notification.ActionButton>button</Notification.ActionButton>
  <Notification.CloseButton/>
</Notification>

<Notification show>
  <Notification.TextLabel>
    {'This notification has '}
    <TextLink theme="darkBackground" underlineStyle="always">
      text link action
    </TextLink>
  </Notification.TextLabel>
  <Notification.ActionButton>and a button</Notification.ActionButton>
  <Notification.CloseButton/>
</Notification>
</div>
`,
    }),

    section.code({
      title: 'Appearance',
      source: `<div>
      <div style={{height: 100}}>
        <div style={{height: 40, background: '#bada55'}}>content below notification</div>
        <Notification type="local" show timeout={10000000}>
          <Notification.TextLabel>Overlay the content</Notification.TextLabel>
          <Notification.CloseButton/>
        </Notification>
      </div>

      <Notification type="global" show>
        <Notification.TextLabel>Push the content</Notification.TextLabel>
        <Notification.CloseButton/>
      </Notification>
    </div>`,
    }),
  ],
};

export default () => (
  <div>
    <h2>{meta.title}</h2>
    <div>{meta.subtitle}</div>
    <div>report an issue at {meta.issueUrl}</div>
    <div>source at {meta.sourceUrl}</div>

    {meta.sections
      .filter(({ hidden }) => !hidden)
      .map(sec => {
        const renderer = sectionRenderers[sec.type] || sectionRenderers.error;
        return renderer(sec);
      })}
  </div>
);
