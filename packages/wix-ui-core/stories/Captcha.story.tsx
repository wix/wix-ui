import * as React from 'react';

import {Captcha} from '../src/components/captcha';

const demoSiteKey = '6LdES1wUAAAAALhi9MkatrLPLjfAAgukePTZGpTH';

class TestLoadCaptcha extends React.Component {
  state = {
    loaded: false
  };

  render() {
    return (
      <div>
        <Captcha data-hook="captcha-test-example" sitekey={demoSiteKey} onVerify={()=>null} onLoad={() => this.setState({loaded: true})}/>
        {this.state.loaded ? <div data-hook="captcha-test-example-loaded">loaded</div> : null}
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
