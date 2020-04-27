import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { iconButton } from '../../../../../src/themes/backoffice';
import More from 'wix-ui-icons-common/More';
import MoreSmall from 'wix-ui-icons-common/MoreSmall';

const iconButtonSizes = {
  tiny: { size: 'tiny', px: '18' },
  small: { size: 'small', px: '18' },
  medium: { size: 'medium', px: '24' },
  large: { size: 'large', px: '24' },
};

const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { iconButton } from "wix-ui-core/themes/backoffice";
import More from "wix-ui-icons-common/More";
import MoreSmall from 'wix-ui-icons-common/MoreSmall';

export default () => (
  <React.Fragment>
     <ButtonNext className={iconButton('${iconButtonSizes.tiny.size}')}>
      <MoreSmall width="${iconButtonSizes.tiny.px}" height="${iconButtonSizes.tiny.px}" />
    </ButtonNext>
    <ButtonNext className={iconButton('${iconButtonSizes.small.size}')}>
      <MoreSmall width="${iconButtonSizes.small.px}" height="${iconButtonSizes.small.px}" />
    </ButtonNext>
    <ButtonNext className={iconButton()}>
      <More width="${iconButtonSizes.medium.px}" height="${iconButtonSizes.medium.px}" />
    </ButtonNext>
    <ButtonNext className={iconButton('${iconButtonSizes.large.size}')}>
      <More width="${iconButtonSizes.large.px}" height="${iconButtonSizes.large.px}" />
    </ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    IconButton supports four main sizes:{' '}
    <code>{iconButtonSizes.tiny.size}</code>,{' '}
    <code>{iconButtonSizes.small.size}</code>,{' '}
    <code>{iconButtonSizes.medium.size}</code>, and{' '}
    <code>{iconButtonSizes.large.size}</code> sizes. Default size is{' '}
    <code>{iconButtonSizes.medium.size}</code>
  </div>
);

interface IconButtonSizesProps {
  style?: object;
}

export const IconButtonSizes = ({ style }: IconButtonSizesProps) => (
  <CodeShowcase
    title="Icon Buttons (sizes)"
    style={style}
    code={example}
    description={description}
  >
    <ButtonNext className={iconButton(iconButtonSizes.tiny.size)}>
      <MoreSmall
        width={iconButtonSizes.tiny.px}
        height={iconButtonSizes.tiny.px}
      />
    </ButtonNext>
    <ButtonNext className={iconButton(iconButtonSizes.small.size)}>
      <MoreSmall
        width={iconButtonSizes.small.px}
        height={iconButtonSizes.small.px}
      />
    </ButtonNext>
    <ButtonNext className={iconButton()}>
      <More
        width={iconButtonSizes.medium.px}
        height={iconButtonSizes.medium.px}
      />
    </ButtonNext>
    <ButtonNext className={iconButton(iconButtonSizes.large.size)}>
      <More
        width={iconButtonSizes.large.px}
        height={iconButtonSizes.large.px}
      />
    </ButtonNext>
  </CodeShowcase>
);
