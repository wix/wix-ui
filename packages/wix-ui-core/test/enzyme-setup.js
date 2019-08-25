const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// signature_pad library type declaration contains export = SignaturePad
// which is invalid in jest (as a default import) unless we use esModuleInterop
// flag in tsconfig
jest.mock('signature_pad', () => ({
  default: function FakeSignaturePad() {
    this.clear = jest.fn();
    this.off = jest.fn();
    this.on = jest.fn();
    this.toDataURL = jest.fn();
    this.isEmpty = jest.fn();
    this.onEnd = jest.fn();
  }
}));
