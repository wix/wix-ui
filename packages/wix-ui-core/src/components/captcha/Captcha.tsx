import * as React from 'react';
import * as Reaptcha from 'reaptcha';

export interface CaptchaProps {

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
      <Reaptcha sitekey="6LdES1wUAAAAALhi9MkatrLPLjfAAgukePTZGpTH" />
    );
  }
}
