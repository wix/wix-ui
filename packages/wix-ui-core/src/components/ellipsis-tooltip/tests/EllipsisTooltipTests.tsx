import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  testFolder,
  testNames,
  dataHooks,
  dataHooksContent,
} from './testSettings';
import { EllipsisTooltip } from '../';

storiesOf(testFolder, module)
  .add(testNames.haveEllipsis, () => (
    <div style={{ width: '170px', background: 'azure' }}>
      <EllipsisTooltip data-hook={dataHooks.haveEllipsis}>
        {extenedProps => (
          <div data-hook={dataHooksContent.haveEllipsis} {...extenedProps()}>
            This text is going to get ellipsed
          </div>
        )}
      </EllipsisTooltip>
    </div>
  ))
  .add(testNames.noStylesInTooltip, () => (
    <div style={{ width: '170px', background: 'azure' }}>
      <EllipsisTooltip data-hook={dataHooks.noStylesInTooltip}>
        {extenedProps => (
          <span
            data-hook={dataHooksContent.noStylesInTooltip}
            {...extenedProps()}
            style={{ color: 'purple' }}
          >
            This text is going to get ellipsed
          </span>
        )}
      </EllipsisTooltip>
    </div>
  ))
  .add(testNames.noEllipsis, () => (
    <div style={{ background: 'azure' }}>
      <EllipsisTooltip data-hook={dataHooks.noEllipsis}>
        {extenedProps => (
          <span data-hook={dataHooksContent.noEllipsis} {...extenedProps()}>
            This text will not get ellipsed since the width of this row is
            really really huge
          </span>
        )}
      </EllipsisTooltip>
    </div>
  ));
