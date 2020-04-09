import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import More from 'wix-ui-icons-common/More';
import { Avatar } from '../../../src/components/avatar';
import { avatar, backofficeTheme } from '../../../src/themes/backoffice';

const NAME = 'John H Doe';

const AvatarStory = () => (
  <div style={{ margin: '0px 0 16px', paddingLeft: '20px' }}>
    <CodeShowcase title="Default" theme={backofficeTheme}>
      <Avatar className={avatar()} name={NAME} />
    </CodeShowcase>

    <CodeShowcase title="Text with BG Colors" theme={backofficeTheme}>
      <Avatar className={avatar('colorBlue')} name={NAME} />
      <Avatar className={avatar('colorGreen')} name={NAME} />
      <Avatar className={avatar('colorGrey')} name={NAME} />
      <Avatar className={avatar('colorRed')} name={NAME} />
      <Avatar className={avatar('colorOrange')} name={NAME} />
    </CodeShowcase>

    <CodeShowcase title="Sizes" theme={backofficeTheme}>
      <Avatar className={avatar('size90')} name={NAME} />
      <Avatar className={avatar('size72')} name={NAME} />
      <Avatar className={avatar('size60')} name={NAME} />
      <Avatar className={avatar('size48')} name={NAME} />
      <Avatar className={avatar('size36')} name={NAME} />
      <Avatar className={avatar('size30')} name={NAME} />
      <Avatar className={avatar('size24')} name={NAME} />
      <Avatar className={avatar('size18')} name={NAME} />
    </CodeShowcase>

    <CodeShowcase title="Icon" theme={backofficeTheme}>
      <Avatar className={avatar()} placeholder={<More />} />
    </CodeShowcase>

    <CodeShowcase title="Image" theme={backofficeTheme}>
      <Avatar
        className={avatar()}
        imgProps={{ src: 'https://randomuser.me/api/portraits/women/39.jpg' }}
      />
    </CodeShowcase>
  </div>
);

export default AvatarStory;
