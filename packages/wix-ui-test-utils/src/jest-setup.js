import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

const originConsoleError = console.error;
let errors = [];

console.error = (...args) => {
  errors.push(args);
  originConsoleError.apply(console, args);
};

beforeEach(() => errors = []);

afterEach(() => {
  if (errors.length > 0) {
    throw new Error(`Test has ${errors.length} Unhandled Errors:\n${errors}`);
  }
});
