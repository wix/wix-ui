import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import More from 'wix-ui-icons-common/More';
import { Avatar } from '../../../src/components/avatar';
import {
  avatar,
  backofficeTheme
} from '../../../src/themes/backoffice';

const description = (
  <div>
    Avatar with text (name initials)
  </div>
);

const AvatarStory = () => (
  <div style={{ margin: '0px 0 16px', paddingLeft: '20px' }}>
    <CodeShowcase
      title="Default"
      theme={backofficeTheme}
    >
      <Avatar name="John Doe" />
    </CodeShowcase>

    <CodeShowcase
      title="Text with BG Colors"
      theme={backofficeTheme}
    >
      <Avatar className={avatar('colorBlue')} name="John Doe" />
      <Avatar className={avatar('colorGreen')} name="John Doe" />
      <Avatar className={avatar('colorGrey')} name="John Doe" />
      <Avatar className={avatar('colorRed')} name="John Doe" />
      <Avatar className={avatar('colorOrange')} name="John Doe" />
    </CodeShowcase>

    <CodeShowcase
      title="Sizes"
      theme={backofficeTheme}
    >
      <Avatar className={avatar('size90')} name="John Doe" />
      <Avatar className={avatar('size72')} name="John Doe" />
      <Avatar className={avatar('size60')} name="John Doe" />
      <Avatar className={avatar('size48')} name="John Doe" />
      <Avatar className={avatar('size36')} name="John Doe" />
      <Avatar className={avatar('size30')} name="John Doe" />
      <Avatar className={avatar('size24')} name="John Doe" />
      <Avatar className={avatar('size18')} name="John Doe" />
    </CodeShowcase>

    <CodeShowcase
      title="Icon"
      theme={backofficeTheme}
    >
      <Avatar icon={<More/>} />
    </CodeShowcase>
  </div>
);

export default AvatarStory;
