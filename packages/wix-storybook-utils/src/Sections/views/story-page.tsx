import * as React from 'react';
import { SectionType, StoryPageSection } from '../../typings/story-section';
import { description } from './description';
import { doDont } from './do-dont';
import { header } from './header';

export const storyPage = (props: StoryPageSection) => {
  console.log('CIA ASSS');
  console.log(props.componentName);
  return (
    <>
      {header(
        {
          issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
          sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/${props.componentName}`,
          type: SectionType.Header,
        },
        {} as any
      )}
      {doDont({
        do: {
          title: 'Use it',
          list: ['Someting'],
        },
        dont: {
          title: 'Dont use it',
          list: ['Something'],
        },
        type: SectionType.DoDont,
      })}
      {description({
        title: 'Description',
        text: `aaa`,
        type: SectionType.Description,
      })}
    </>
  );
};

// export const storyPage: (a: StoryPageSection) => React.ReactNode = ({
//   componentName,
// }) => {
//   console.log('CIA ASSS');
//   console.log(componentName);
// return {
// header({
//   issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
//   sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/${componentName}`,
// }),
//     doDont({
//       do: {
//         title: 'Use it',
//         list: ['Someting'],
//       },
//       dont: {
//         title: 'Dont use it',
//         list: ['Something'],
//       },
//     }),
//   }
// };
