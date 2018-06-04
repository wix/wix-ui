export function queryHook<E extends Element = Element>(baseElement: ParentNode, hook: string): E | null {
  return baseElement.querySelector(`[data-hook~=${hook}]`);
}

export function queryHookAll<E extends Element = Element>(baseElement: ParentNode, hook: string): NodeListOf<E> {
  return baseElement.querySelectorAll(`[data-hook~=${hook}]`);
}
