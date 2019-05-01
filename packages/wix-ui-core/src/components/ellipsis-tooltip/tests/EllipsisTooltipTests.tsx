import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  testFolder,
  testNames,
  dataHooks,
  dataHooksContent,
} from './testSettings';
import { EllipsisTooltip } from '..';
import styles from './EllipsisTooltipTests.st.css';

const wrapperStylesWithEllipsis = { width: '170px', background: 'azure' };
const wrapperStylesNoEllipsis = { background: 'azure' };

storiesOf(testFolder, module)
  .add(testNames.haveEllipsis, () => (
    <div style={wrapperStylesWithEllipsis}>
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
    <div style={wrapperStylesWithEllipsis}>
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
  .add(testNames.mandatoryNonoverridableCss, () => (
    <div style={wrapperStylesWithEllipsis}>
      <EllipsisTooltip data-hook={dataHooks.mandatoryNonoverridableCss}>
        {extenedProps => (
          <span
            data-hook={dataHooksContent.mandatoryNonoverridableCss}
            {...extenedProps({ className: styles.withDifferentWhiteSpace })}
          >
            the property "white-space: nowrap" must be applied, otherwise the
            ellipsis won't work. this will happen even if you try to override it
          </span>
        )}
      </EllipsisTooltip>
    </div>
  ))
  .add(testNames.noEllipsis, () => (
    <div style={wrapperStylesNoEllipsis}>
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
