import * as React from 'react';

import {Captcha} from '../src/components/captcha';
import {Size,Type,Theme} from '../src/components/captcha/types';

const demoSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

class TestLoadCaptcha extends React.Component {
  state = {
    loaded: false,
    expired: false,
    verified: false,
  };

  render() {
    return (
      <div>
        <Captcha data-hook="captcha-test-example" sitekey={demoSiteKey} size={Size.compact} type={Type.image} theme={Theme.dark} onVerify={()=> this.setState({verified:true})} onLoad={() => this.setState({loaded: true})} onExpire={() => {this.setState({verified:true});this.setState({expired: true})}}/>
        {this.state.loaded ? <div data-hook="captcha-test-example-loaded">loaded</div> : null}
        {this.state.expired ? <div data-hook="captcha-test-example-expired">expired</div> : null}
        {this.state.verified ? <div data-hook="captcha-test-example-verified">verified</div> : null}
      </div>
    )
  }
}

export default {
  category: 'Components',
  storyName: 'Captcha',
  component: Captcha,
  componentPath: '../src/components/captcha/Captcha.tsx',

  componentProps: {
    sitekey: demoSiteKey,
    size: Size.normal,
    type: Type.image,
    theme: Theme.light,
    'data-hook': 'storybook-captcha',
  },
  exampleProps: {
    onVerify: token => token
  },
  examples: (
    <div>
      <h3>Tests</h3>
      <TestLoadCaptcha/>
    </div>
  )
};
