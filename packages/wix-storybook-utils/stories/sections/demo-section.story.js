import React from 'react';
import { header, demo  } from '../../src/Sections';



export default {
  category: 'Sections',
  storyName: 'Demo Section',

  sections: [
    header({
      component: 'Demo Section',
    }),

    demo({ title: 'Demo', component: <input/> })
  ],
};
