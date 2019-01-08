import * as React from 'react';
import * as Reaptcha from 'reaptcha';

export interface CaptchaProps {
  sitekey: string;
  onLoad: (any) => void;
  onVerify: (token:string) => void;
  'data-hook': string
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
      <span data-hook={this.props['data-hook']}>
        <Reaptcha sitekey={this.props.sitekey} onLoad={this.props.onLoad} onVerify={this.props.onVerify} />
      </span>
    );
  }
}
