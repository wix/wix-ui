const originConsoleError = console.error;
let errors = [];

console.error = function (...args) {
  errors.push(args);
  originConsoleError.apply(console, args);
};

beforeEach(() => errors = []);

afterEach(() => {
  if (errors.length > 0) {
    throw new Error(`Test has ${errors.length} Unhandled Errors:\n${errors}`);
  }
});
