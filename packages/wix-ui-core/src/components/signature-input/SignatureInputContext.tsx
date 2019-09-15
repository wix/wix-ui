import * as React from 'react';
import SignaturePad from 'signature_pad';

export interface SignatureInputContextValue {
  titleId: string | undefined;
  inputId: string | undefined;
  padApi: SignaturePadApiContext | undefined;
  setSignaturePadContext(api: SignaturePadApiContext): void;
  setSignatureTitleId(id: string | undefined): void;
  setInputId(id: string | undefined): void;
}

export interface SignaturePadApiContext {
  clear(): void;
}

export interface WithSignaturePadProps extends SignatureInputContextValue {}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const SignatureInputContext = React.createContext<SignatureInputContextValue>({
  titleId: undefined,
  padApi: undefined,
  inputId: undefined,
  setSignaturePadContext: () => ({ clear() {} }),
  setSignatureTitleId: () => {},
  setInputId: () => {},
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
