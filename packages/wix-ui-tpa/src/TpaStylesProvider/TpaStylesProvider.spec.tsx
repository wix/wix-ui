import * as React from 'react';
import {mount} from 'enzyme';
import {TpaStylesProvider} from './TpaStyleProvider';
import {WixSdk} from '../WixSdk/WixSdkMock';
import {withTpaStyles} from './withTpaStyles';

let wixSdk;

const Component: React.SFC<any> = ({children}) => <div>{children}</div>;

const renderWrapped = (component = <div/>) => mount(
  <TpaStylesProvider wixSdk={wixSdk}>
    {component}
  </TpaStylesProvider>,
  {attachTo: document.createElement('div')}
);

const siteStyles = {
  fonts: {
    buttonFonts: {
      editorKey: 'font_8',
      family: 'din-next-w01-light',
      fontStyleParam: true,
      preset: 'Custom',
      size: '16px',
      style: {
        italic: true,
        bold: true,
        underline: true
      }
    }
  },
  colors: {
    backgroundColor: {value: 'green'},
    color: {value: 'green'}
  }
};

describe('TpaStylesProvider', () => {
  let wrapper;

  beforeEach(() => wixSdk = new WixSdk(siteStyles));

  afterEach(() => wrapper.detach());

  it('should initialize the state with the correct styles', () => {
    wrapper = renderWrapped();
    expect(wixSdk.Styles.getStyleParams()).toBe(wrapper.state().tpaStyles);
  });

  it('should add event listeners', () => {
    Object.keys(wixSdk.getEventHandlers()).forEach(event =>
      expect(wixSdk.getEventHandlers()[event]).toHaveLength(0)
    );

    wrapper = renderWrapped();

    Object.keys(wixSdk.getEventHandlers()).forEach(event =>
      expect(wixSdk.getEventHandlers()[event]).toHaveLength(1)
    );
  });

  it('should render the children prop', () => {
    wrapper = renderWrapped(<div>Hello</div>);
    expect(wrapper.html()).toBe('<div>Hello</div>');
  });

  it('should update the state when colors are changed', () => {
    wrapper = renderWrapped(<Component/>);
    wixSdk.setColorParam('color', 'green');
    expect(wrapper.state().tpaStyles.colors.color).toBe('green');
  });

  it('should update the state when fonts are changed', () => {
    wrapper = renderWrapped(<Component/>);
    wixSdk.setFontParam('bold', true);
    expect(wrapper.state().tpaStyles.fonts.bold).toBe(true);
  });

  describe('withTpaStyles function', () => {
    const component = ({wixBindings, colors, fonts}) => (
      <div>
        {`color is ${colors.color} and font size is ${fonts.buttonFonts.size}`}
      </div>
    );

    const StyledComponent = withTpaStyles(component);

    it('should pass the colors and fonts on the context', () => {
      wrapper = renderWrapped(<StyledComponent/>);
      expect(wrapper.html()).toBe('<div>color is green and font size is 16px</div>');
    });

    it('should not allow to render a component outside the provider', () => {
      expect(() => wrapper = mount(<StyledComponent/>))
        .toThrow('wix-ui-tpa components must be wrapped by TpaStylesProvider');
    });
  });
});

it('TpaStylesProvider should remove event listeners when unmounts', () => {
  wixSdk = new WixSdk();
  renderWrapped().unmount();

  Object.keys(wixSdk.Events).forEach(event =>
    expect(wixSdk.getEventHandlers()[event]).toHaveLength(0)
  );
});
