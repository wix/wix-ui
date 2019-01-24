import * as React from 'react';

import {Captcha} from '../Captcha';
import {Size, CaptchaType, Theme, CaptchaLang} from '../types';
import {ExampleLoader}  from './ExampleLoader';

export class CaptchaTestComponent extends React.Component {
  state = {
    rendered: false,
    expired: false,
    verified: false,
  };
  private captchaRef = undefined;
  private demoSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  resetCaptcha = () => {
    if (this.captchaRef) {
      this.captchaRef.resetCaptcha();
      this.setState({verified: false})
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
          onVerify={() => this.setState({verified: true})}
          onRender={() => this.setState({rendered:true})}
          onExpire={() => this.setState({expired: true})}
        />
        <div data-hook="captcha-test-example-rendered">rendered={`${this.state.rendered}`}</div>
        <div data-hook="captcha-test-example-expired">expired={`${this.state.expired}`}</div>
        {this.state.verified ? <div data-hook="captcha-test-example-verified-by-state">verified-by-state={`${this.state.verified}`}
          </div> : null}
        {!this.state.verified ? <div data-hook="captcha-test-example-verified-by-neg-state">verified-by-state={`${this.state.verified}`}</div> : null}
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
