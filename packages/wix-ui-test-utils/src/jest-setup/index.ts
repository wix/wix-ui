/* tslint:disable-next-line no-console*/
const originConsoleError = console.error;
let errors: any[] = [];

/* tslint:disable-next-line no-console*/
console.error = (...args: any[]) => {
  errors.push(args);
  originConsoleError.apply(console, args);
};

export const consoleErrors = {
   reset:  () => errors = [],
   get: () => errors.slice().map(args => args.reduce((acc: string, arg: any) => {return acc + arg; }, ''))
};

beforeEach(() => errors = []);

afterEach(() => {
  if (errors.length > 0) {
    throw new Error(`Test has ${errors.length} Unhandled Errors:\n${errors}`);
  }
});
