const originConsoleError = console.error;
let errors: any[] = [];

console.error = (...args: any[]) => {
  errors.push(args);
  originConsoleError.apply(console, args);
};

beforeEach(() => errors = []);

afterEach(() => {
  if (errors.length > 0) {
    throw new Error(`Test has ${errors.length} Unhandled Errors:\n${errors}`);
  }
});
