export const testFolder = 'Tests/EllipsisTooltip';

export const testNames = {
  haveEllipsis: 'should have ellipsis when text overflows',
  noStylesInTooltip:
    'should not show any styles on the text inside the tooltip',
  noEllipsis: 'should not show the apply ellipsis when the text is short',
  mandatoryNonoverridableCss: 'should force "white-space: nowrap"',
};

export const dataHooks = {
  haveEllipsis: 'ellipsis-with-tooltip',
  noStylesInTooltip: 'ellipsis-no-styles',
  noEllipsis: 'no-ellipsis',
  mandatoryNonoverridableCss: 'ellipsis-whitespace-no-wrap',
};

export const dataHooksContent = {
  haveEllipsis: 'ellipsis-with-tooltip__content',
  noStylesInTooltip: 'ellipsis-no-styles__content',
  noEllipsis: 'no-ellipsis__content',
  mandatoryNonoverridableCss: 'ellipsis-whitespace-no-wrap__content',
};
