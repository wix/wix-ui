import { getId } from './Pagination';

export const measureAndSetRootMinWidth = (
  compNode: HTMLElement,
  paginationMode: 'pages' | 'input' | 'plane',
  idPrefix: string = '',
): void => {
  compNode.style.minWidth = '';
  compNode.style.minHeight = '';

  const getById = (id: string): HTMLElement =>
    compNode.querySelector(`#${getId(idPrefix, id)}`);

  const getMinWidth = (elmnt: HTMLElement): number =>
    elmnt ? parseInt(window.getComputedStyle(elmnt).minWidth, 10) : 0;

  const getWidthWithMargins = (element: HTMLElement): number => {
    if (!element) {
      return 0;
    }
    const style = window.getComputedStyle(element);
    return (
      parseInt(style.marginRight, 10) +
      element.offsetWidth +
      parseInt(style.marginLeft, 10)
    );
  };

  const getHeightWithMargins = (element: HTMLElement): number => {
    if (!element) {
      return 0;
    }
    const style = window.getComputedStyle(element);
    return (
      parseInt(style.marginBottom, 10) +
      element.offsetHeight +
      parseInt(style.marginTop, 10)
    );
  };

  const navButtonsMinWidth =
    getWidthWithMargins(getById('navButtonNext')) +
    getWidthWithMargins(getById('navButtonPrevious')) +
    getWidthWithMargins(getById('navButtonFirst')) +
    getWidthWithMargins(getById('navButtonLast'));

  let selectionMinWidth = 0;
  let minHeight = 0;

  if (paginationMode === 'pages') {
    // means we're in "pages" pagination mode
    selectionMinWidth = getMinWidth(getById('pageStrip'));

    minHeight = Math.max(
      getHeightWithMargins(getById('pageStrip')),
      getHeightWithMargins(getById('navButtonNext')),
    );
  } else if (paginationMode === 'input') {
    // means we're in "input" pagination mode
    selectionMinWidth =
      getWidthWithMargins(getById('totalPages')) +
      getWidthWithMargins(getById('slash')) +
      getWidthWithMargins(getById('pageInput'));

    minHeight = Math.max(
      getHeightWithMargins(getById('pageInput')),
      getHeightWithMargins(getById('navButtonNext')),
    );
  } else if (paginationMode === 'plane') {
    // means we're in "plane" pagination mode
    selectionMinWidth =
      getWidthWithMargins(getById('totalPages')) +
      getWidthWithMargins(getById('slash')) +
      getWidthWithMargins(getById('currentPage'));

    minHeight = Math.max(
      getHeightWithMargins(getById('currentPage')),
      getHeightWithMargins(getById('navButtonNext')),
    );
  }

  compNode.style.minWidth = navButtonsMinWidth + selectionMinWidth + 'px';
  compNode.style.minHeight = minHeight + 'px';
};
