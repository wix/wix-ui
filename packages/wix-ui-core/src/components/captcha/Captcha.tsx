import * as React from 'react';
import * as Reaptcha from 'reaptcha';
import {Size, Type, Theme} from './types'
import styles from './Captcha.st.css';

export interface CaptchaProps {
  sitekey: string;
  size: Size;
  type: Type;
  theme: Theme;
  onLoad: () => void;
  onExpire: () => void;
  onVerify: (token: string) => void;
  'data-hook': string
}

interface CaptchaState {
}

/**
 * Captcha
 */
export class Captcha extends React.PureComponent<CaptchaProps, CaptchaState> {
  static displayName = 'Captcha';
  private captchaRef = undefined;

  constructor(props:CaptchaProps){
    super(props);
    this.captchaRef = null;
  }

  state = {
    loaded: false,
    token: undefined,
    verified: false,
  };

  /**
   * reload a new captcha from google
   */
  resetCaptcha(){
    if(this.captchaRef) {
      this.captchaRef.reset();
    }
  }

  /**
   * this will indicate the google component is loaded and ready to be displayed
   */
  onLoad = () => {
    this.setState({loaded: true});
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  /**
   * returns the verification token to the caller
   */
  verificationToken() {
    return this.state.token;
  }

  /**
   * the user has successfully taken the captcha and we have the verification id
   * @param verificationString
   */
  onVerified = (verificationString: string) => {
    this.setState({verified: true});
    this.setState({token: verificationString});
    if (this.props.onVerify) {
      this.props.onVerify(verificationString);
    }
  };

  /**
   * The user has taken the captcha challange however it has not been verified the page was not submitted in time
   * so we need to ask the user to retake the captcha challenge.
   */
  onExpiered = () => {
    this.setState({verified: false});
    this.setState({token: undefined});
    if (this.props.onExpire) {
      this.props.onExpire();
    }
  };

  /**
   * we render the captcha.
   * we render a loader until we get a loaded indication from the captcha lib
   *
   */
  render() {
    let loaderStyle = styles.loader;
    let captchaDivStyle = styles.Captcha_invisible;
    if (this.state.loaded) {
      captchaDivStyle = styles.Captcha_visible;
      loaderStyle = styles.Captcha_invisible;
    }
    return (
      <div>
        <div className={loaderStyle}></div>
        <div className={captchaDivStyle} data-hook={this.props['data-hook']}>
          <Reaptcha
            ref={e => (this.captchaRef = e)}
            sitekey={this.props.sitekey}
            type={this.props.type}
            size={this.props.size}
            theme={this.props.theme}
            onLoad={this.onLoad}
            onVerify={this.onVerified}
            onExpire={this.props.onExpire}
          />
        </div>
      </div>
    );
  }
}
