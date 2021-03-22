import React, { useState } from 'react';
import addons from '@storybook/addons';
import copy from 'copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import { LinkSmall, ConfirmSmall } from 'wix-ui-icons-common';

import Markdown from '../../Markdown';
import styles from './styles.scss';

const CopyToClipboard = () => <div className={styles.tooltipContent}>{translations.copyLink}</div>
const CopiedToClipboard = () => <div className={styles.tooltipContent}><ConfirmSmall/>{translations.linkCopiedToClipboard}</div>

const translations = {
  copyLink: 'Copy Link',
  linkCopiedToClipboard: 'Copied',
};

export const AnchoredTitle = ({ title }) => {
  const [tooltipComponent, setTooltipComponent] = useState(CopyToClipboard)
  const id = title.replace(/\s+/g, '_');
  let copyLinkRef = null;

  const onCopy = (event: React.MouseEvent) => {
    event.preventDefault();

    setTooltipComponent(CopiedToClipboard);
    addons.getChannel().emit('navigateUrl', `#${id}`);
    setTimeout(() => {
      copy(new URL(window.parent.location as any).href)
    });
  }

  const onMouseEnter = () => ReactTooltip.show(copyLinkRef);

  const onMouseLeave = () => {
    ReactTooltip.hide(copyLinkRef)
    setTooltipComponent(CopyToClipboard)
  }

  return (
    <div 
      className={styles.titleContainer}
      onClick={onCopy}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <a
        ref={ref => copyLinkRef = ref}
        data-for={id}
        data-tip
        className={styles.link}
        id={id}
        href={`#${id}`}
        target="_self"
        onClick={event => event.preventDefault()}
      >
        <LinkSmall />
      </a>
      <Markdown
        key="title"
        className={styles.title}
        source={title}
      />
      <ReactTooltip
        id={id}
        effect="solid"
        arrowColor="transparent"
        offset={{ top: -5 }}
        className={styles.tooltip}
      >
        {tooltipComponent}
      </ReactTooltip>
    </div>
  )
}