import * as React from 'react';
import SignaturePad from 'signature_pad';

export interface SignatureInputContextValue {
  pad: SignaturePad | undefined;
  setSignaturePad(pad: SignaturePad): void;
}

export interface WithSignaturePadProps extends SignatureInputContextValue {}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const SignatureInputContext = React.createContext<SignatureInputContextValue>({
  pad: undefined,
  setSignaturePad: () => {},
});

export const SignatureInputContextProvider = SignatureInputContext.Provider;

export const withSignatureInputContext = <P extends WithSignaturePadProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<Omit<P, keyof WithSignaturePadProps>> => {
  return props => (
    <SignatureInputContext.Consumer>
      {contextProps => {
        return (
          <WrappedComponent {...contextProps} {...((props as unknown) as P)} />
        );
      }}
    </SignatureInputContext.Consumer>
  );
};
