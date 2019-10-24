import * as React from 'react';
const Loader = __WSR.Loader.Loader;

function LoaderWithMandatoryProps() {
  return <Loader />;
}

function LoaderWithAllProps() {
  return (
    <Loader
      color="blue"
      dataHook="hook"
      size="large"
      status="error"
      statusMessage="msg"
      text="text"
      shouldLoadAsync
    />
  );
}
