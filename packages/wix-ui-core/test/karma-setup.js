import expect from 'expect';
import JestMock from 'jest-mock';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Jest compatibility
window.expect = expect;
window.jest = JestMock;
window.beforeAll = window.before;
window.afterAll = window.after;

Enzyme.configure({adapter: new EnzymeAdapter()});
