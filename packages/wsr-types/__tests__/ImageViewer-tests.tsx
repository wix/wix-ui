import * as React from "react";
import ImageViewer from "wix-style-react/ImageViewer";
import { imageViewerTestkitFactory } from "wix-style-react/dist/testkit";
import { imageViewerTestkitFactory as imageViewerEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { imageViewerTestkitFactory as imageViewerPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function ImageViewerWithMandatoryProps() {
  return <ImageViewer />;
}

function ImageViewerWithAllProps() {
  return (
    <ImageViewer
      addImageInfo=""
      disabled
      error
      errorMessage=""
      height=""
      imageUrl=""
      onAddImage={_ev => {}}
      onImageLoad={_ev => {}}
      onRemoveImage={_ev => {}}
      onUpdateImage={_ev => {}}
      removeImageInfo=""
      removeRoundedBorders
      showRemoveButton
      showUpdateButton
      tooltipPlacement="top"
      tooltipProps={{}}
      updateImageInfo=""
      width=""
    />
  );
}

async function testkits() {
  const testkit = imageViewerTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = imageViewerEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await imageViewerPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
