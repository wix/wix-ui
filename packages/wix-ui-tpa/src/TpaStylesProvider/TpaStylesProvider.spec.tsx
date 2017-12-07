import {mount} from 'enzyme';
import * as React from 'react';
import {TpaStylesProvider} from './';
import {WixSdkTestkit} from '../../test/WixSdkTestkit';
import {withTpaStyles} from './withTpaStyles';

const Component: React.SFC<any> = ({children, wixBindings}) => <div>{children}</div>

const renderWrapped = (Component = <div/>) => mount(
  <TpaStylesProvider wixSdk={WixSdkTestkit.get()}>
    {Component}
  </TpaStylesProvider>,
  {attachTo: document.createElement('div')}      
);

describe('TpaStylesProvider', () => {
  let wrapper;
  
  const styles = {
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

  beforeEach(() => WixSdkTestkit.init(styles));

  afterEach(() => {
    wrapper.detach();
    WixSdkTestkit.reset();
  });

  it('should be initialize the state with the correct styles', () => {
    wrapper = renderWrapped()
    expect(WixSdkTestkit.getStyles()).toBe(wrapper.state().tpaStyles);
  });

  it('should add event listeners', () => {
    Object.keys(WixSdkTestkit.getEventHandlers()).forEach(event =>
      expect(WixSdkTestkit.getEventHandlers()[event]).toHaveLength(0)
    );
    
    wrapper = renderWrapped();
    
    Object.keys(WixSdkTestkit.getEventHandlers()).forEach(event =>
      expect(WixSdkTestkit.getEventHandlers()[event]).toHaveLength(1)
    );
  });

  it('should render the children prop', () => {
    wrapper = renderWrapped(<div>Hello</div>);
    expect(wrapper.html()).toBe('<div>Hello</div>');
  });

  it('should update the state when colors changed', () => {
    wrapper = renderWrapped(<Component/>);

    WixSdkTestkit.changeColorParam('color', 'green');
    expect(wrapper.state().tpaStyles.colors.color).toBe('green');
  });

  it('should update the state when fonts changed', () => {
    wrapper = renderWrapped(<Component/>);
    
    WixSdkTestkit.changeFontParam('bold', true);
    expect(wrapper.state().tpaStyles.fonts.bold).toBe(true);
  });

  describe('withTpaStyles function', () => {
    const Component = ({wixBindings, colors, fonts}) => (
      <div>
        {`color is ${colors.color} and font size is ${fonts.buttonFonts.size}`}
      </div>
    );

    const StyledComponent = withTpaStyles(Component);
    
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

it('TpaStylesProvider should removeEventListeners when unmounts', () => {
  WixSdkTestkit.init();
  const wrapper = renderWrapped();
  wrapper.unmount();
  
  //TODO: make wix-eventually public and use it. issue https://github.com/wix/wix-ui/issues/26
  setTimeout(() => 
    Object.keys(WixSdkTestkit.getEventHandlers()).forEach(event =>
      expect(WixSdkTestkit.getEventHandlers()[event]).toHaveLength(0)
    ), 0
  );

  WixSdkTestkit.reset();
});
