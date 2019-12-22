import * as React from "react";
import Carousel from "wix-style-react/Carousel";
import { carouselTestkitFactory } from "wix-style-react/dist/testkit";
import { carouselTestkitFactory as carouselEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { carouselTestkitFactory as carouselPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function CarouselWithMandatoryProps() {
  return <Carousel />;
}

function CarouselWithAllProps() {
  return (
    <Carousel
      afterChange={_s => {}}
      autoplay
      beforeChange={(_old, _new) => {}}
      buttonSkin="inverted"
      className="cls"
      dataHook="hook"
      dots
      images={["a"]}
      infinite
      initialSlideIndex={1}
      variableWidth
    />
  );
}
document.querySelectorAll
async function testkits() {
  const testkit = carouselTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = carouselEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await carouselPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
