import * as React from 'react';
import * as Reaptcha from 'reaptcha';
import {Size, CaptchaType, Theme, CaptchaLang} from './types'
import styles from './Captcha.st.css';

export interface CaptchaProps {
  sitekey: string;
  size?: Size;
  captchaType?: CaptchaType;
  theme?: Theme;
  lang?: CaptchaLang;
  onLoad?: () => void;
  onExpire?: () => void;
  onRender?: () => void;
  onVerify?: (token: string) => void;
}

interface CaptchaState {
  rendered: boolean;
  token: string,
  verified: boolean;
}

/**
 * Captcha
 */
export class Captcha extends React.PureComponent<CaptchaProps, CaptchaState> {
  static displayName = 'Captcha';
  private captchaRef = null;

  constructor(props: CaptchaProps) {
    super(props);
  }

  state = {
    rendered:false,
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
  isVerified() {
    return this.state.verified;
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
    this.setState({verified: false, token: undefined});
    if (this.props.onExpire) {
      this.props.onExpire();
    }
  };

  /**
   * The user has taken the captcha challange however it has not been verified the page was not submitted in time
   * so we need to ask the user to retake the captcha challenge.
   */
  private onRender = () => {
    this.setState({rendered:true});
    if (this.props.onRender) {
      this.props.onRender();
    }
  };

  /**
   * we render the captcha.
   * we render a loader until we get a loaded indication from the captcha lib
   *
   */
  render() {
    const {sitekey, captchaType, size, theme, lang} = this.props;
    return (
      <div {...styles('root', {loaded: this.state.rendered}, this.props)} data-captchaType={captchaType} data-theme={theme} data-lang={lang} data-size={size} >
        {!this.state.rendered && <div className={styles.loader}/>}
        <div className={styles.captcha}>
          <Reaptcha
            ref={e => (this.captchaRef = e)}
            sitekey={sitekey}
            captchaType={captchaType}
            size={size}
            theme={theme}
            hl={lang}
            onLoad={this.onLoad}
            onVerify={this.onVerified}
            onExpire={this.onExpired}
            onRender={this.onRender}
          />
        </div>
      </div>
    );
  }
}
