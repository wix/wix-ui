import * as React from "react";
import Notification from "wix-style-react/Notification";
import { notificationTestkitFactory } from "wix-style-react/dist/testkit";
import { notificationTestkitFactory as notificationEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { notificationTestkitFactory as notificationPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function NotificationWithMandatoryProps() {
  return <Notification />;
}

function NotificationWithAllProps() {
  return (
    <Notification
      dataHook="hook"
      show={true}
      theme={'error'}
      type={'local'}
      autoHideTimeout={1}
      zIndex={9999}
      onClose={(source: string)=>{}}
    >
      <Notification.ActionButton link={true} type={"button"} target={"target"}>
        Action button
      </Notification.ActionButton>
      <Notification.TextLabel>hello</Notification.TextLabel>
      <Notification.CloseButton link={true} type={"button"}/>
    </Notification>
  );
}

async function testkits() {
  const testkit = notificationTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = notificationEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await notificationPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
