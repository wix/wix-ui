import * as React from 'react';

import {Captcha} from '../Captcha';
import {CaptchaLang, CaptchaType, Size, Theme} from '../types';
import {ExampleLoader} from './ExampleLoader';
import {constants} from './constants'

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
      <form onsubmit={e => e.preventDefault()}>
        <div>
          <Captcha
            ref={e => (this.captchaRef = e)}
            loader={<ExampleLoader />}
            data-hook={constants.dataHook}
            sitekey={constants.demoSiteKey}
            captchaType={CaptchaType.image}
            theme={Theme.dark}
            size={Size.compact}
            lang={CaptchaLang.EnglishUS}
            required
            onVerify={() => this.setState({resetted: false, verifiedToken: this.getVerifiedToken(),})}
            onRender={() => this.setState({ rendered: true })}
            onExpire={() => this.setState({ resetted: false, expired: true })}
            onReset={() => this.setState({resetted: true, verifiedToken: this.getVerifiedToken(),})}
          />
          {this.state.rendered && (<div data-hook={constants.renderDataHook}>{constants.renderedMark}{`${this.state.rendered}`}</div>)}
          <div>expired={`${this.state.expired}`}</div>
          {this.isCaptchaVerified() && (
            <div data-hook={`${constants.verifiedTokenDataHook}`}>
              {constants.verifiedTokenMark}
              {this.getVerifiedToken()}
            </div>
          )}
          {this.state.resetted && (
            <div data-hook={constants.resetDataHook}>{constants.resetMark}</div>
          )}
          <button
            onClick={this.resetCaptcha}
            type="button"
            data-hook={constants.resetButtonDataHook}
          >
            Click to reset captcha
          </button>
          <button type="submit" value="Submit Captcha">
            Click to submit captcha
          </button>
        </div>
      </form>
    )
  }
}
