import * as React from 'react';
import RichTextInputArea from 'wix-style-react/RichTextInputArea';
import { richTextInputAreaTestkitFactory } from 'wix-style-react/dist/testkit';
import { richTextInputAreaTestkitFactory as richTextInputAreaEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { richTextInputAreaTestkitFactory as richTextInputAreaPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';
import { EditorState } from 'draft-js';

function RichTextInputAreaWithMandatoryProps() {
  return <RichTextInputArea onChange={() => {}} />;
}

function RichTextInputAreaWithAllProps() {
  return (
    <RichTextInputArea
      dataHook="value"
      initialValue="value"
      placeholder="value"
      disabled={true}
      status="error"
      statusMessage="value"
      onChange={(value: EditorState) => {}}
      maxHeight="value"
      texts={{
        toolbarButtons: {
          boldButtonLabel: "value",
          italicButtonLabel: "value",
          underlineButtonLabel: "value",
          linkButtonLabel: "value",
          bulletedListButtonLabel: "value",
          numberedListButtonLabel: "value",
        },
        insertionForm: {
          confirmButtonLabel: "value",
          cancelButtonLabel: "value",
          link: {
            textInputPlaceholder: "value",
            urlInputPlaceholder: "value",
          },
        }
      }}
    />
  );
}

async function testkits() {
  const testkit = richTextInputAreaTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = richTextInputAreaEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await richTextInputAreaPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
