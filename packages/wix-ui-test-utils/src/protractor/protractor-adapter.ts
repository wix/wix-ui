import {Locator, UniDriverList, UniDriver, MapFn} from 'unidriver';
import {ElementFinder} from 'protractor';
import {waitFor} from './utils';

type ElementGetter = () => Promise<ElementFinder | null>;
type ElementsGetter = () => Promise<ElementFinder[]>;

export const protractorUniDriverList = (
  elems: ElementsGetter
): UniDriverList<ElementFinder> => {
  const map = async <T>(fn: MapFn<T>) => {
    const els = await elems();
    const promises = els.map((e, i) => {
      const bd = protractorUniDriver(() => Promise.resolve(e));
      return fn(bd, i);
    });
    return Promise.all(promises);
  };

  return {
    get: (idx: number) => {
      const elem = async () => {
        const els = await elems();
        return els[idx];
      };
      return protractorUniDriver(elem);
    },
    text: async () => {
      return map(d => d.text());
    },
    count: async () => {
      const els = await elems();
      return els.length;
    },
    map,
    filter: fn => {
      return protractorUniDriverList(async () => {
        const els = await elems();

        const results = await Promise.all(
          els.map((e, i) => {
            const bd = protractorUniDriver(() => Promise.resolve(e));
            return fn(bd, i);
          })
        );

        return els.filter((_, i) => {
          return results[i];
        });
      });
    }
  };
};

export const protractorUniDriver = (
  el: ElementGetter
): UniDriver<ElementFinder> => {
  const elem = async () => {
    const e = await el();
    if (!e) {
      throw new Error(`Cannot find element`);
    }
    return e;
  };

  const exists = async () => {
    try {
      await elem();
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    // done
    $: (newLoc: Locator) => {
      return protractorUniDriver(async () => {
        return (await elem()).$(newLoc);
      });
    },
    // done
    $$: (selector: Locator) =>
      protractorUniDriverList(async () => {
        const elem = await el();
        if (!elem) {
          throw new Error(`Cannot find element`);
        }
        return elem.$$(selector);
      }),
    text: async () => {
      const text = await (await elem()).getAttribute('textContent');
      return text || '';
    },
    click: async () => {
      return (await elem()).click();
    },
    hasClass: async (className: string) => {
      const cm: any = await (await elem()).getAttribute('classList');
      return cm.indexOf(className) !== -1;
    },
    enterValue: async (value: string) => {
      const e = await elem();
      await e.focus();
      await e.type(value);
    },
    exists,
    value: async () => {
      const value = await (await elem()).getAttribute('value');
      return value || '';
    },
    attr: async name => {
      const attr = await (await elem()).getAttribute(name);
      return attr || '';
    },
    wait: async () => {
      return waitFor(exists);
    },
    type: 'protractor',
    getNative: elem
  };
};
