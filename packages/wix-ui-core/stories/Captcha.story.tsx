import * as React from 'react';

import {Captcha} from '../src/components/captcha';
import {Size, CaptchaType, Theme, CaptchaLang} from '../src/components/captcha/types';

const demoSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

class TestLoadCaptcha extends React.Component {
  state = {
    loaded: false,
    expired: false,
    verified : false,
  };
  private captchaRef = undefined;

  resetCaptcha = () => {
    if(this.captchaRef){
      this.captchaRef.resetCaptcha();
      this.setState({verified :false})
    }
  };

  isInnerCaptchaVerified = () => {
    if(this.captchaRef){
      return this.captchaRef.isVerified();
    }
    return 'un initialized ';
  };

  getInnerTheme = () => {
    if(this.captchaRef){
      return this.captchaRef.getTheme();
    }
    return 'un initialized ';
  };

  getInnerSize = () => {
    if(this.captchaRef){
      return this.captchaRef.getSize();
    }
    return 'un initialized ';
  };

  getInnerLang = () => {
    if(this.captchaRef){
      return this.captchaRef.getLang();
    }
    return 'un initialized ';
  };

  getVerifiedToken = () => {
    if(this.captchaRef){
      return this.captchaRef.verificationToken();
    }
    return '';
  };

  render() {
    return (
      <div>
        <Captcha
          ref={e => (this.captchaRef = e)}
          data-hook="captcha-test-example"
          sitekey={demoSiteKey}
          size={Size.compact}
          captchaType={CaptchaType.image}
          theme={Theme.dark}
          lang={CaptchaLang.EnglishUS}
          onVerify={()=> this.setState({verified :true})}
          onLoad={() => this.setState({loaded: true})}
          onExpire={() => {this.setState({expired: true})}}
        />
        <div data-hook="captcha-test-example-lang">lang={`${this.getInnerLang()}`}</div>
        <div data-hook="captcha-test-example-theme">theme={`${this.getInnerTheme()}`}</div>
        <div data-hook="captcha-test-example-size">size={`${this.getInnerSize()}`}</div>
        <div data-hook="captcha-test-example-loaded">loaded={`${this.state.loaded}`}</div>
        <div data-hook="captcha-test-example-expired">expired={`${this.state.expired}`}</div>
        <div data-hook="captcha-test-example-Inner-verified">inner verified={`${this.isInnerCaptchaVerified()}`}</div>
        {this.state.verified ? <div data-hook="captcha-test-example-verified-by-state">verified-by-state={`${this.state.verified}`}</div> : null}
        {!this.state.verified ? <div data-hook="captcha-test-example-verified-by-neg-state">verified-by-state={`${this.state.verified}`}</div> : null}
        <div data-hook="captcha-test-example-verified-token">verifiedToken={this.getVerifiedToken()}</div>
        <button
          onClick={this.resetCaptcha}
          type="button"
          data-hook="captcha-reset-button"
        >
          Click to reset captcha
        </button>
        <button
          onClick={() => alert(this.isInnerCaptchaVerified())}
          type="button"
          data-hook="captcha-verification-state-button"
        >
         Click to see verification state
        </button>
      </div>
    )
  }
}

export default {
  category: 'WIP',
  storyName: 'Captcha',
  component: Captcha,
  componentPath: '../src/components/captcha/Captcha.tsx',

  componentProps: {
    sitekey: demoSiteKey,
    size: Size.normal,
    type: CaptchaType.image,
    theme: Theme.light,
    lang:CaptchaLang.EnglishUS,
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
