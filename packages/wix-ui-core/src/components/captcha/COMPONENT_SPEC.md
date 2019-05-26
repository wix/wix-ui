# Captcha

Captcha is a component that provides bot detection capabilities.
<br><br>
![image](./readme-assets/newCaptchaAnchor.gif)
## Elements


## API

#### Component Props

| name        | type                             | defaultValue | isRequired | description                                                                                      |
|:------------|:---------------------------------|:-------------|:-----------|:-------------------------------------------------------------------------------------------------|
| sitekey     | string                           |              | yes        | The captcha has site key and server key for verification of the token This is the site key       |
| size        | Size (enum of normal/compact)    | normal       | No         | Captcha size                                                                                     |
| captchaType | CaptchaType (enum of image/audio)| image        | No         | The type of the challenge we will provide the user                                               |
| theme       | Theme (enum of light/dark)       | light        | No         | The color of the component                                                                       |
| lang        | CaptchaLang (enum of all supported languages | EnglishUS       | No         | The language of the captcha ans its messages |
| loader      | React component                  | empty component | No         | React component that will be displayed while the real captcha is being loaded |
| onExpire    | function                         |              | No         | This callback is called when we the verified captcha was not submitted in a reasonable time frame|
| onVerify    | function                         |              | No         | This callback is called when we the captcha challenge is successful                              |
| onError    | function                         |    -          | No         | This callback is called when reCAPTCHA fails with an error                               |
| required    | boolean                         |    false          | No         | set the captcha to behave like a required html input element (fail submit if not checked)|

#### Instance methods

| method name                 |  description                                                                                                            |
|:----------------------------|:------------------------------------------------------------------------------------------------------------------------|
| resetCaptcha()              |This method will reload the captcha internals and will invalid any prev token,  it is useful to deal with expired captcha| 
| getVerificationToken():String  | returns the verification token (String) we got from google or undefined                                                 |
| isVerified():Boolean        | returns true if the captcha challenge has been successfully taken and not expired                                       |


## General Behavior
The user is provided with a challenge to detect if it is a real person or a bot.
Google may present additional challenges to further verify the bot/human
The size and theme properties control the visual aspects of the captcha. 

## Technical Considerations
This component is a wrapper over the google recaptcha component, meaning additional integration with a verification service is required

### React Code Example
import * as React from 'react';
import {Captcha, Size, CaptchaType, Theme,, lang} from 'wix-ui-core/captcha';
const demoSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

class CaptchaExample extends React.Component {

    handleExpiration = () => {
        //disable submit button
    };
    
    handleVerify = () => {
        //enable submit button
    };

    render() {
        return (
            <Captcha
              sitekey={demoSiteKey}
              loader={<LoaderWrapper/>}
              size={Size.compact}
              captchaType={CaptchaType.image}
              theme={Theme.dark}
              onVerify={()=> this.handleVerify()}
              onExpire={() => {this.handleExpiration())}}
            />
        )
      }
    }
}

## Style API
support the styles.loader style.

### Style Code Example

```css
.loaderWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
}
```

## Accessibility & Keyboard Navigation

The captcha checkbox will have `tabIndex = 0` by default meaning it will be focusable and part of the keyboard navigation flow.
