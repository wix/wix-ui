import * as React from 'react';
import * as Reaptcha from 'reaptcha';

export interface CaptchaProps {
  sitekey: string;
  onVerify: (token:string) => void;
}

interface CaptchaState {

}

/**
 * Captcha
 */
export class Captcha extends React.Component<CaptchaProps, CaptchaState> {
  static displayName = 'Captcha';

  render() {
    return (
      <Reaptcha sitekey={this.props.sitekey} onVerify={this.props.onVerify} />
    );
  }
}
