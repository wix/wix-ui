import * as React from 'react';
import Component from '../Component';

import { header, doDont  } from '../../src/Sections';

const dofor = [
  'Use it to insert names, titles and other short textual information.',
  'Use it to build custom inputs like Credit Card input.'
]

const dontfot = [
  'Don’t use it to insert long paragraphs, instead use the component.',
  'Don’t use it as a search input, instead use the component.',
  'Don’t use it to insert long paragraphs, instead use the component. Don’t use it to insert long paragraphs, instead use the component.'
]

export default {
  category: 'Sections',
  storyName: 'DoDont Section',


  sections: [
    header({
      component: 'DoDont Section',
    }),

    doDont({
      do: {
        title: 'Do',
        list: dofor
      },
      dont: {
        title: 'Dont',
        list: dontfot
      }
    })
  ],
};
