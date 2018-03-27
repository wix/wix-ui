import {getId} from './Pagination';

export const measureAndSetRootMinWidth = (compNode: HTMLElement, paginationMode: 'pages' | 'input', idPrefix: string = ''): void => {
    compNode.style.minWidth = '';

    const getById = (id: string): HTMLElement => compNode.querySelector(`#${getId(idPrefix, id)}`);

    const getMinWidth = (elmnt: HTMLElement): number => elmnt ? parseInt(window.getComputedStyle(elmnt).minWidth, 10) : 0;

    const getWidthWithMargins = (elmnt: HTMLElement): number => {
        if (!elmnt) {return 0; }
        const style = window.getComputedStyle(elmnt);
        return parseInt(style.marginRight, 10) +
        elmnt.offsetWidth +
        parseInt(style.marginLeft, 10);
    };

    const navButtonsMinWidth = getWidthWithMargins(getById('navButtonNext')) +
    getWidthWithMargins(getById('navButtonPrevious')) +
    getWidthWithMargins(getById('navButtonFirst')) +
    getWidthWithMargins(getById('navButtonLast'));

    let selectionMinWidth = 0;

    if (paginationMode === 'pages') {
        // means we're in "pages" pagination mode
        selectionMinWidth = getMinWidth(getById('pageStrip'));
    } else {
        // means we're in "input" pagination mode
        selectionMinWidth = getWidthWithMargins(getById('totalPages')) +
        getWidthWithMargins(getById('slash')) +
        getWidthWithMargins(getById('pageInput'));
    }

    compNode.style.minWidth = navButtonsMinWidth + selectionMinWidth + 'px';
};
