import * as React from 'react';
import {Badge as StylableBadge} from '../../src/components/StylableBadge';
import commonStyle from '../../src/components/StylableBadge/BadgeStyle.st.css';

export class StylableBadgeStory extends React.Component<{}, {}> {
  render() {
    return (
        <StylableBadge
            {...commonStyle('root')}
            data-hook="storybook-badge"
            >
            I'm a Badge!
        </StylableBadge>
    );
  }
}
