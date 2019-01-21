export const isBrowser = typeof window !== 'undefined';

// for server-side-rendering, we assume the client will support object-fit
export const objectFitSupported = !isBrowser || ('object-fit' in document.createElement('img').style);