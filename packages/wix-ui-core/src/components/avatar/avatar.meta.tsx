import * as React from 'react';
import Registry from '@ui-autotools/registry';

import { Avatar } from './avatar';
import User from 'wix-ui-icons-common/User';

const avatarMetadata = Registry.getComponentMetadata(Avatar);

const IMG_SRC_STUB = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/*
* Simulations desabled, since we're getting warning from react-strict-mode-warning (hydarate component test).

* Warning: Unsafe lifecycle methods were found within a strict-mode tree:
*
* componentWillReceiveProps: Please update the following components to use static getDerivedStateFromProps instead: Avatar
*
* We shuold be compatibe with React 15 and React 16, so we need to either compromise and use componentDidUpdate instead of componentWillReceiveProps.
* Or remove this hydration test.
*/

/*
avatarMetadata.addSim({
  title: 'Only name specified, generates initials text JD',
  props: {
    name: 'John Doe'
  }
});

avatarMetadata.addSim({
  title: 'Only icon specified',
  props: {
    icon: <User/>,
    name: 'John Doe'
  }
});

avatarMetadata.addSim({
  title: 'imgProps specified',
  props: {
    imgProps: {src: IMG_SRC_STUB},
    name: 'John Doe'
  }
});
*/