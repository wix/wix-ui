import * as React from 'react';

import {Captcha} from '../Captcha';
import {Size, CaptchaType, Theme, CaptchaLang} from '../types';
import {ExampleLoader}  from './ExampleLoader';

export class CaptchaTestComponent extends React.Component {
  state = {
    rendered: false,
    expired: false,
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
          onVerify={() => this.setState({verifiedToken: this.getVerifiedToken()})}
          onRender={() => this.setState({rendered:true})}
          onExpire={() => this.setState({expired: true})}
          onReset={() => this.setState({verifiedToken: this.getVerifiedToken()})}
        />
        <div data-hook="captcha-test-example-rendered">rendered={`${this.state.rendered}`}</div>
        <div data-hook="captcha-test-example-expired">expired={`${this.state.expired}`}</div>
        <div data-hook="captcha-test-example-verified-token">verifiedToken={this.getVerifiedToken()}</div>
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
