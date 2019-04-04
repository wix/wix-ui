import * as React from 'react';
import { Captcha } from '../Captcha';
import { constants } from '../test-assets/constants';

export const RequiredCaptchaSubmissionExample = () => (
  <div>
    <form onSubmit={e => e.preventDefault()}>
      <Captcha sitekey={constants.demoSiteKey} loader={<div />} required />
      <button type="submit" value="Submit Captcha">
        Click to submit captcha
      </button>
    </form>
  </div>
);
