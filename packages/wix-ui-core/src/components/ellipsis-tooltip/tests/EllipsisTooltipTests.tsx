import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  testFolder,
  testNames,
  dataHooks,
  dataHooksContent,
} from './testSettings';
import { EllipsisTooltip } from '..';
import { style, classes, cssStates  } from './EllipsisTooltipTests.st.css';

const wrapperStylesWithEllipsis = {
  width: '170px',
  background: 'azure',
  overflow: 'auto',
};
const wrapperStylesNoEllipsis = { background: 'azure' };

storiesOf(testFolder, module)
  .add(testNames.haveEllipsis, () => (
    <div style={wrapperStylesWithEllipsis}>
      <EllipsisTooltip data-hook={dataHooks.haveEllipsis}>
        {extenedStyleProps => (
          <div
            data-hook={dataHooksContent.haveEllipsis}
            {...extenedStyleProps()}
          >
            This text is going to get ellipsed
          </div>
        )}
      </EllipsisTooltip>
    </div>
  ))
  .add(testNames.noStylesInTooltip, () => (
    <div style={wrapperStylesWithEllipsis}>
      <EllipsisTooltip data-hook={dataHooks.noStylesInTooltip}>
        {extenedStyleProps => (
          <span
            data-hook={dataHooksContent.noStylesInTooltip}
            {...extenedStyleProps({ style: { color: 'purple' } })}
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
        {extenedStyleProps => (
          <span
            data-hook={dataHooksContent.mandatoryNonoverridableCss}
            {...extenedStyleProps({
              className: styles.withDifferentWhiteSpace,
            })}
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
        {extenedStyleProps => (
          <span
            data-hook={dataHooksContent.noEllipsis}
            {...extenedStyleProps()}
          >
            This text will not get ellipsed since the width of this row is
            really really huge
          </span>
        )}
      </EllipsisTooltip>
    </div>
  ));
