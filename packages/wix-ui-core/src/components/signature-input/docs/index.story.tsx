import * as React from 'react';
import { SignatureInput } from '..';
import { ButtonNext } from '../../button-next';
import { SIGNNATURE_INPUT_METADATA } from '../constants';
import {
  header,
  description,
  title,
  tabs,
  tab,
  divider,
  code,
  testkit,
  importExample,
  playground,
  columns,
  api,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import {Category} from '../../../../stories/utils';

export default {
  category: Category.COMPONENTS,
  storyName: SIGNNATURE_INPUT_METADATA.displayName,
  component: SignatureInput,
  componentPath: '..',
  componentProps: {
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <SignatureInput.Title>
          {({ getTitleProps }) => (
            <label {...getTitleProps()}>Enter your signature here:</label>
          )}
        </SignatureInput.Title>
        <SignatureInput.SigningPad style={{ border: '1px solid black' }} />
        <SignatureInput.ClearButton>
          {({ getClearButtonProps }) => (
            <ButtonNext
              {...getClearButtonProps({
                onClick: () => window.alert('clear callback'),
              })}
            >
              Clear
            </ButtonNext>
          )}
        </SignatureInput.ClearButton>
      </div>
    ),
  },
  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Sidebar/',
    }),
    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'A sidebar menu container component, created to display a drill in menu and persistent elements',
          }),
          importExample(),
          divider(),
          title('Examples'),
          columns([
            description({
              title: 'Basic example',
              text:
                'In its very basic simple form - the `Sidebar` component provides a container for elements',
            }),
            // code({
            //   source: SimpleSidebarRaw,
            // }),
          ]),
          columns([
            description({
              title: 'Custom Context Usage',
              text:
                'Items can get internal selection logic from the `SidebarItemContextConsumer` context component. Check the source code for more information about how to use the context components, for example `<SidebarContextConsumer/> allows achieving custom back button behavior`',
            }),
            // code({
            //   source: SidebarItemContextRaw,
            // }),
          ]),
        ],
      }),
      tab({ title: 'Playground', sections: [playground()] }),
      tab({ title: 'Testkit', sections: [testkit()] }),
      tab({ title: 'API', sections: [api()] }),
    ]),
  ],
};
