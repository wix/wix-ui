const PopperJs = require('popper.js');

export default class Popper {
  static placements = PopperJs.placements;

  constructor() {
    return {
      destroy: () => null,
      scheduleUpdate: () => null
    };
  }
}
