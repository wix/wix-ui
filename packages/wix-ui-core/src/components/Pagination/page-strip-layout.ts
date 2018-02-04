export type PageStripLayout = number[];

export function createStaticLayout({
  totalPages,
  currentPage,
  maxPagesToShow,
  showFirstPage,
  showLastPage
}: {
  totalPages: number,
  currentPage: number,
  maxPagesToShow: number,
  showFirstPage: boolean,
  showLastPage: boolean
}): PageStripLayout {
  return createLayout({
    totalPages,
    currentPage,
    lowerBound: 1,
    upperBound: totalPages,
    pageRangeCost: (a, b) => b - a + 1,
    showFirstPage,
    showLastPage,
    rewindToFirstCost: 2,
    rewindToLastCost: 2,
    budget: maxPagesToShow
  });
}

function rangeToPreRenderForResponsiveLayout(
  totalPages: number,
  currentPage: number,
  maxPagesToShow: number
): [number, number] {
  return [
    Math.max(currentPage - maxPagesToShow, 1),
    Math.min(currentPage + maxPagesToShow, totalPages)
  ];
}

export function createResponsiveLayoutTemplate({
  totalPages,
  currentPage,
  maxPagesToShow
}: {
  totalPages: number,
  currentPage: number,
  maxPagesToShow: number
}): PageStripLayout {
  const [lowerBound, upperBound] = rangeToPreRenderForResponsiveLayout(totalPages, currentPage, maxPagesToShow);
  return [1, 0, ...closedRange(lowerBound, upperBound), 0, totalPages];
}

// Takes a container with children rendered using createResponsiveLayoutTemplate,
// measures the children, and decides how many can be shown without overflowing the container.
// For measurements to work correctly the pages must not have any dynamic spacing between them
// such as justify-content: space-evenly, but they can have static spacing such as margins.
// As long as we're using flexbox with centered pages we don't need to worry about the outer
// margins of the first and last page, they will be trimmed by flexbox automatically.
// maxPagesToShow is not really taken into account, it's used to derive the range of pages
// that was pre-rendered by createResponsiveLayoutTemplate().
export function createResponsiveLayout({
  container,
  totalPages,
  currentPage,
  maxPagesToShow,
  showFirstPage,
  showLastPage
}: {
  container: Element,
  totalPages: number,
  currentPage: number,
  maxPagesToShow: number,
  showFirstPage: boolean,
  showLastPage: boolean
}): PageStripLayout {
  const children = Array.from(container.children);
  const pages = children.slice(2, -2);
  const containerWidth = container.getBoundingClientRect().width;
  const firstRect = children[0].getBoundingClientRect();
  const lastRect = children[children.length - 1].getBoundingClientRect();
  const lowerRect = pages[0].getBoundingClientRect();
  const upperRect = pages[pages.length - 1].getBoundingClientRect();
  const rewindToFirstCost = mergeBoundingRects(firstRect, lowerRect).width - lowerRect.width;
  const rewindToLastCost = mergeBoundingRects(lastRect,  upperRect).width - upperRect.width;
  const [lowerBound, upperBound] = rangeToPreRenderForResponsiveLayout(totalPages, currentPage, maxPagesToShow);
  const pageRangeCost = (a: number, b: number): number => {
    const aRect = pages[a - lowerBound].getBoundingClientRect();
    const bRect = pages[b - lowerBound].getBoundingClientRect();
    return mergeBoundingRects(aRect, bRect).width;
  };

  return createLayout({
    totalPages,
    currentPage,
    lowerBound,
    upperBound,
    pageRangeCost,
    showFirstPage,
    showLastPage,
    rewindToFirstCost,
    rewindToLastCost,
    budget: containerWidth
  });
}

function createLayoutByExpandingPageRange({
  totalPages,
  low,
  high,
  lowerBound,
  upperBound,
  pageRangeCost,
  budget,
  showRewindToFirst,
  showRewindToLast,
  rewindToFirstCost,
  rewindToLastCost
}: {
  totalPages: number;
  low: number;
  high: number;
  lowerBound: number;
  upperBound: number;
  pageRangeCost: (low: number, hight: number) => number;
  budget: number;
  showRewindToFirst: boolean;
  showRewindToLast: boolean;
  rewindToFirstCost: number;
  rewindToLastCost: number;
}): PageStripLayout | null {
  const safeLowerBound = showRewindToFirst ? Math.max(lowerBound, 4) : lowerBound;
  const safeUpperBound = showRewindToLast ? Math.min(upperBound, totalPages - 3) : upperBound;

  if (!isNondecreasing([lowerBound, safeLowerBound, low, high, safeUpperBound, upperBound])) {
    return null;
  }

  lowerBound = safeLowerBound;
  upperBound = safeUpperBound;
  budget -= (showRewindToFirst ? rewindToFirstCost : 0) + (showRewindToLast ? rewindToLastCost : 0);

  let acceptableLow = 0;
  let acceptableHigh = 0;

  while (lowerBound <= low && high <= upperBound && pageRangeCost(low, high) <= budget) {
    acceptableLow = low;
    acceptableHigh = high;
    if (low === lowerBound && high === upperBound) {
      break;
    }
    low = Math.max(low - 1, lowerBound);
    high = Math.min(high + 1, upperBound);
  }

  return acceptableLow && acceptableHigh
    ? [
        ...(showRewindToFirst ? [1, 0] : []),
        ...closedRange(acceptableLow, acceptableHigh),
        ...(showRewindToLast ? [0, totalPages] : [])
      ]
    : null;
}

function createLayout({
  totalPages,
  currentPage,
  lowerBound,
  upperBound,
  pageRangeCost,
  showFirstPage,
  showLastPage,
  rewindToFirstCost,
  rewindToLastCost,
  budget
}: {
  currentPage: number;
  totalPages: number;
  lowerBound: number;
  upperBound: number;
  pageRangeCost: (a: number, b: number) => number;
  showFirstPage: boolean;
  showLastPage: boolean;
  rewindToFirstCost: number;
  rewindToLastCost: number;
  budget: number;
}): PageStripLayout {
  const prevOrLowerBound = Math.max(currentPage - 1, lowerBound);
  const nextOrUpperBound = Math.min(currentPage + 1, upperBound);
  const expand = (low: number, high: number, showRewindToFirst: boolean, showRewindToLast: boolean) =>
    createLayoutByExpandingPageRange({
      totalPages,
      low,
      high,
      lowerBound,
      upperBound,
      pageRangeCost,
      budget,
      showRewindToFirst,
      showRewindToLast,
      rewindToFirstCost,
      rewindToLastCost
    });

  return (
    // Try to show the entire range.
    (lowerBound === 1 || !showFirstPage) && (upperBound === totalPages || !showLastPage) &&
    expand(lowerBound, upperBound, false, false) ||

    // Ellipsis only in the end. Show at least one page after the current.
    (showLastPage && lowerBound === 1) &&
    expand(lowerBound, nextOrUpperBound, false, true) ||

    // Ellipsis only in the beginning. Show at least one page before the current.
    (showFirstPage && upperBound === totalPages) &&
    expand(prevOrLowerBound, upperBound, true, false) ||

    // Ellipses on both sides. Show at least one page before the current and one after.
    (showFirstPage && showLastPage) &&
    expand(prevOrLowerBound, nextOrUpperBound, true, true) ||

    // Ellipsis only in the end. Don't try to include the next page.
    (showLastPage && lowerBound === 1) &&
    expand(lowerBound, currentPage, false, true) ||

    // Ellipsis only in the beginning. Don't try to include the previous page.
    (showFirstPage && upperBound === totalPages) &&
    expand(currentPage, upperBound, true, false) ||

    // Ellipses on both sides. Don't try to include the previous and the next page.
    (showFirstPage && showLastPage) &&
    expand(currentPage, currentPage, true, true) ||

    // Cut off both sides without adding ellipses.
    expand(currentPage, currentPage, false, false) ||

    // If there's not enough space even for the current page, still show it.
    [currentPage]
  );
}

function closedRange(start: number, stop: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i <= stop; i += step) {
    result.push(i);
  }
  return result;
}

function isNondecreasing(sequence: number[]): boolean {
  for (let i = 1; i < sequence.length; i++) {
    if (sequence[i] < sequence[i - 1]) {
      return false;
    }
  }
  return true;
}

function mergeBoundingRects(a: ClientRect, b: ClientRect): ClientRect {
  const top    = Math.min(a.top, b.top);
  const right  = Math.max(a.right, b.right);
  const bottom = Math.max(a.bottom, b.bottom);
  const left   = Math.min(a.left, b.left);
  const width  = right - left;
  const height = bottom - top;
  return {top, right, bottom, left, width, height};
}
