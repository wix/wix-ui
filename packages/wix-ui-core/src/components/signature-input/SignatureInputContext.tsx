import * as React from 'react';
import SignaturePad from 'signature_pad';

export interface SignatureInputContextValue {
  titleId: string | undefined;
  pad: SignaturePad | undefined;
  setSignaturePadContext(pad: SignaturePad): void;
  setSignatureTitleId(id: string | undefined): void;
}

export interface WithSignaturePadProps extends SignatureInputContextValue {}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const SignatureInputContext = React.createContext<SignatureInputContextValue>({
  titleId: undefined,
  pad: undefined,
  setSignaturePadContext: () => {},
  setSignatureTitleId: () => {},
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
