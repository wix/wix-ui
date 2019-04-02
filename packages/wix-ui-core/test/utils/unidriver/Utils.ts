import { UniDriver } from '@unidriver/core';

/**
 * Safe getNative that returns `null` if the element doesn't exist.
 * (Instead of throwing an Error)
 */
export async function safeGetNative<T>(base: UniDriver<T>) {
  return (await base.exists()) ? base.getNative() : null;
}