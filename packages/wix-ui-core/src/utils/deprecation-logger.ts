const noop = () => {};

let depLogger: Logger = {
  log: noop,
};

interface Logger {
  log(msg: string): void;
}

if (process.env.NODE_ENV !== 'production') {
  class DeprecationLogger implements Logger {
    constructor(private readonly prefix: string) {
      this.log = this.log.bind(this);
    }

    reportedMessages = new Set<string>();

    /**
     * Log a warning message, once per key. (Calling `log` twice with same key would result in one log)
     *
     * @param {*} message
     * @memberof DeprecationLogger
     */
    log(message: string) {
      if (!this.reportedMessages.has(message)) {
        this.reportedMessages.add(message);
        this.printWarning(message);
      }
    }

    printWarning = (msg: string) => {
      const message = `${this.prefix}${msg}`;
      if (console) {
        console.warn(message); // eslint-disable-line
      }
      try {
        // --- Welcome to debugging wix-style-react ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  depLogger = new DeprecationLogger('wix-ui-core: [WARNING] ');
}

export { depLogger };
export default (msg: string) => depLogger.log(msg);
