import * as React from 'react';

import {Captcha} from '../Captcha';
import {CaptchaLang, CaptchaType, Size, Theme} from '../types';
import {ExampleLoader} from './ExampleLoader';
import {CaptchaConstants} from '../Captcha.constants'

export class CaptchaTestComponent extends React.Component {
  state = {
    rendered: false,
    expired: false,
    resetted: false,
    verifiedToken: '',
  };
  private captchaRef = undefined;

  resetCaptcha = () => {
    if (this.captchaRef) {
      this.captchaRef.resetCaptcha();
    }
  };

  getVerifiedToken = () => {
    if (this.captchaRef) {
      return this.captchaRef.getVerificationToken();
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
          data-hook={CaptchaConstants.dataHook}
          sitekey={CaptchaConstants.demoSiteKey}
          captchaType={CaptchaType.image}
          theme={Theme.dark}
          size={Size.compact}
          lang={CaptchaLang.EnglishUS}
          onVerify={() => this.setState({resetted:false,verifiedToken: this.getVerifiedToken()})}
          onRender={() => this.setState({rendered:true})}
          onExpire={() => this.setState({resetted:false,expired: true})}
          onReset={() => this.setState({resetted:true, verifiedToken: this.getVerifiedToken()})}
        />
        <div data-hook={CaptchaConstants.renderDataHook}>{CaptchaConstants.renderedMark}{`${this.state.rendered}`}</div>
        <div>expired={`${this.state.expired}`}</div>
        {this.isCaptchaVerified() && <div data-hook={`${CaptchaConstants.verifiedTokenDataHook}`}>{CaptchaConstants.verifiedTokenMark}{this.getVerifiedToken()}</div>}
        {this.state.resetted && <div data-hook={CaptchaConstants.resetDataHook}>{CaptchaConstants.resetMark}</div>}
        <button
          onClick={this.resetCaptcha}
          type="button"
          data-hook={CaptchaConstants.resetButtonDataHook}
        >
          Click to reset captcha
        </button>
      </div>
    )
  }
}
