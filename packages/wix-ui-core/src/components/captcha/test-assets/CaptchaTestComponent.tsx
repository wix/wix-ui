import * as React from 'react';

import {Captcha} from '../Captcha';
import {Size, CaptchaType, Theme, CaptchaLang} from '../types';
import {ExampleLoader}  from './ExampleLoader';

export class CaptchaTestComponent extends React.Component {
  state = {
    rendered: false,
    expired: false,
    reseted: false,
    verifiedToken: '',
  };
  private captchaRef = undefined;
  private demoSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  resetCaptcha = () => {
    if (this.captchaRef) {
      this.captchaRef.resetCaptcha();
    }
  };

  getVerifiedToken = () => {
    if (this.captchaRef) {
      return this.captchaRef.verificationToken();
    }
    return '';
  };

  isCaptchaVerified(){
    if (this.captchaRef) {
      return this.captchaRef.isVerified();
    }
    return false;
  }

  render() {
    return (
      <div>
        <Captcha
          ref={e => (this.captchaRef = e)}
          loader={<ExampleLoader/>}
          data-hook="captcha-test-example"
          sitekey={this.demoSiteKey}
          size={Size.compact}
          captchaType={CaptchaType.image}
          theme={Theme.dark}
          lang={CaptchaLang.EnglishUS}
          onVerify={() => this.setState({reseted:false,verifiedToken: this.getVerifiedToken()})}
          onRender={() => this.setState({rendered:true})}
          onExpire={() => this.setState({reseted:false,expired: true})}
          onReset={() => this.setState({reseted:true, verifiedToken: this.getVerifiedToken()})}
        />
        <div data-hook="captcha-test-example-rendered">rendered={`${this.state.rendered}`}</div>
        <div data-hook="captcha-test-example-expired">expired={`${this.state.expired}`}</div>
        {this.isCaptchaVerified() && <div data-hook="captcha-test-example-verified-token">verifiedToken={this.getVerifiedToken()}</div>}
        {this.state.reseted && <div data-hook="captcha-reset">reset</div>}
        <button
          onClick={this.resetCaptcha}
          type="button"
          data-hook="captcha-reset-button"
        >
          Click to reset captcha
        </button>
      </div>
    )
  }
}
