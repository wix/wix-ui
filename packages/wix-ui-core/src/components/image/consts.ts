export enum ImageStatus {
  loading = 'loading',
  loaded = 'loaded',
  error = 'error',
}

// FALLBACK_IMAGE - an empty 1x1 pixel we provide as an alternative for the native browser broken pixel image
export const FALLBACK_IMAGE: string =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';