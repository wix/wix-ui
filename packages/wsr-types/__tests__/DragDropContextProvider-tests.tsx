import * as React from "react";
import DragDropContextProvider from "wix-style-react/DragDropContextProvider";

function dragDropContextProviderWithMandatoryProps() {
  return <DragDropContextProvider />;
}

function dragDropContextProviderWithAllProps() {
  return (
    <DragDropContextProvider
      backend={()=>{}}
    />
  );
}
