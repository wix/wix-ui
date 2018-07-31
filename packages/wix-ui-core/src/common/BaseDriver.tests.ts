import { BaseDriver } from './BaseDriver';
export function runBaseDriverTests(createElement: ()=> HTMLElement) {

  describe('BaseDriver', () => {
    let driver: BaseDriver;
    let element: HTMLElement;

    beforeEach(() => {
      element = createElement();
      driver = new BaseDriver({element});
    });

    it('exists', () => {
      expect(driver.exists()).toBeTruthy();
    });

  });
}