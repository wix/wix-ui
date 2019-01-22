import * as React from 'react';
import * as Reaptcha from 'reaptcha';
import {Size, CaptchaType, Theme, CaptchaLang} from './types'
import styles from './Captcha.st.css';

export interface CaptchaProps {
  sitekey: string;
  size: Size;
  captchaType: CaptchaType;
  theme: Theme;
  lang: CaptchaLang;
  onLoad: () => void;
  onExpire: () => void;
  onVerify: (token: string) => void;
  'data-hook': string
}

interface CaptchaState {
  loaded: boolean;
  token: string,
  verified: boolean;
}

/**
 * Captcha
 */
export class Captcha extends React.PureComponent<CaptchaProps, CaptchaState> {
  static displayName = 'Captcha';
  private captchaRef = undefined;

  constructor(props: CaptchaProps) {
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
  resetCaptcha() {
    this.setState({verified: false});
    this.setState({token: undefined});
    if (this.captchaRef) {
      this.captchaRef.reset();
    }
  }

  /**
   * this will indicate the google component is loaded and ready to be displayed
   */
  private onLoad = () => {
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
   * return true if the captcha challenge has been successfully taken
   */
  isVerified(){
    return this.state.verified;
  }

  /**
   * expose the internal theme
   */
  getTheme(){
    return this.props.theme;
  }

  /**
   * expose the internal size
   */
  getSize(){
    return this.props.size;
  }

  /**
   * expose the internal lang
   */
  getLang(){
    return this.props.lang;
  }

  /**
   * the user has successfully taken the captcha and we have the verification id
   * @param verificationString
   */
  private onVerified = (verificationString: string) => {
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
  private onExpired = () => {
    this.setState({verified: false,token: undefined});
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
    return (
      <div {...styles('root', {loaded: this.state.loaded}, this.props)}>
        {!this.state.loaded && <div className={styles.loader}/>}
        <div className={styles.captcha}>
          <Reaptcha
            ref={e => (this.captchaRef = e)}
            sitekey={this.props.sitekey}
            captchaType={this.props.captchaType}
            size={this.props.size}
            theme={this.props.theme}
            hl={this.props.lang}
            onLoad={this.onLoad}
            onVerify={this.onVerified}
            onExpire={this.onExpired}
          />
        </div>
      </div>
    );
  }
}
