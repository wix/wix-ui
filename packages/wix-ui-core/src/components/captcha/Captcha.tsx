import * as React from 'react';
import * as Reaptcha from 'reaptcha';
import { Size, CaptchaType, Theme, CaptchaLang } from './types';
import styles from './Captcha.st.css';

export interface CaptchaProps {
  sitekey: string;
  loader: any;
  size?: Size;
  captchaType?: CaptchaType;
  theme?: Theme;
  lang?: CaptchaLang;
  onLoad?(): void;
  onReset?(): void;
  onExpire?(): void;
  onRender?(): void;
  onVerify?(token: string): void;
}

interface CaptchaState {
  rendered: boolean;
  token: string;
}

/**
 * Captcha
 */
export class Captcha extends React.PureComponent<CaptchaProps, CaptchaState> {
  static displayName = 'Captcha';
  private captchaRef = null;

  state = {
    rendered: false,
    token: undefined,
  };

  /**
   * reload a new captcha from google
   */
  resetCaptcha() {
    if (this.captchaRef) {
      this.captchaRef.reset();
    }
    this.setState({ token: undefined }, () => {
      if (this.props.onReset) {
        this.props.onReset();
      }
    });
  }

  /**
   * this will indicate the google component is loaded and ready to be displayed
   */
  private readonly onLoad = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  /**
   * returns the verification token to the caller
   */
  getVerificationToken() {
    return this.state.token;
  }

  /**
   * return true if the captcha challenge has been successfully taken
   */
  isVerified() {
    return this.state.token !== undefined;
  }

  /**
   * the user has successfully taken the captcha and we have the verification id
   * @param verificationString
   */
  private readonly onVerified = (verificationString: string) => {
    this.setState({ token: verificationString });
    if (this.props.onVerify) {
      this.props.onVerify(verificationString);
    }
  };

  /**
   * The user has taken the captcha challange however it has not been verified the page was not submitted in time
   * so we need to ask the user to retake the captcha challenge.
   */
  private readonly onExpired = () => {
    this.setState({ token: undefined });
    if (this.props.onExpire) {
      this.props.onExpire();
    }
  };

  /**
   * The user has taken the captcha challange however it has not been verified the page was not submitted in time
   * so we need to ask the user to retake the captcha challenge.
   */
  private readonly onRender = () => {
    this.setState({ rendered: true });
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
    const { sitekey, loader, captchaType, size, theme, lang } = this.props;
    return (
      <div
        {...styles('root', { loaded: this.state.rendered }, this.props)}
        data-captcha-type={captchaType}
        data-theme={theme}
        data-lang={lang}
        data-size={size}
      >
        {!this.state.rendered && (
          <div className={styles.loaderWrapper}>{loader}</div>
        )}
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
