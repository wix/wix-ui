import {getId} from './Pagination';

export const measureAndSetRootMinWidth = (compNode: HTMLElement, paginationMode: 'pages' | 'input', idPrefix: string = '') => {
    compNode.style.minWidth = '';

    const getIds = (name: string) => getId(idPrefix, name);

    const getWidthWithMargins = elmnt => {
        if (!elmnt) {return 0; }
        const style = window.getComputedStyle(elmnt);
        return parseInt(style.marginRight, 10) +
        parseInt(style.paddingRight, 10) +
        parseInt(style.width, 10) +
        parseInt(style.paddingLeft, 10) +
        parseInt(style.marginLeft, 10);
    };

    const getMinWidth = elmnt => {
        if (!elmnt) {return 0; }
        return parseInt(window.getComputedStyle(elmnt).minWidth, 10);
    };

    const nextBtnNode = compNode.querySelector(`#${getIds('navButtonNext')}`);
    const prevBtnNode = compNode.querySelector(`#${getIds('navButtonPrevious')}`);
    const firstBtnNode = compNode.querySelector(`#${getIds('navButtonFirst')}`);
    const lastBtnNode = compNode.querySelector(`#${getIds('navButtonLast')}`);
    const btnsMinWidth = getWidthWithMargins(nextBtnNode) +
    getWidthWithMargins(prevBtnNode) +
    getWidthWithMargins(firstBtnNode) +
    getWidthWithMargins(lastBtnNode);

    let selectionMinWidth = 0;

    if (paginationMode === 'pages') {
        // means we're in "pages" pagination mode
        const pageStripNode = compNode.querySelector(`#${getIds('pageStrip')}`);
        selectionMinWidth = getMinWidth(pageStripNode);
    } else {
        // means we're in "input" pagination mode
        const slashNode = compNode.querySelector(`#${getIds('slash')}`);
        const totalPagesNode = compNode.querySelector(`#${getIds('totalPages')}`);
        const pageInputNode = compNode.querySelector(`#${getIds('pageInput')}`);
        selectionMinWidth = getWidthWithMargins(totalPagesNode) +
        getWidthWithMargins(slashNode) +
        getWidthWithMargins(pageInputNode);
    }

    compNode.style.minWidth = btnsMinWidth + selectionMinWidth + 'px';
};
