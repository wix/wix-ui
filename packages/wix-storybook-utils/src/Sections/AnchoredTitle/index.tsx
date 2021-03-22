import * as React from 'react';
import addons from '@storybook/addons';
import copy from 'copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import { LinkSmall, ConfirmSmall } from 'wix-ui-icons-common';

import Markdown from '../../Markdown';
import styles from './styles.scss';

const CopyToClipboard = () => <div className={styles.tooltip}>{translations.copyLink}</div>
const CopiedToClipboard = () => <div className={styles.tooltip}><ConfirmSmall/>{translations.linkCopiedToClipboard}</div>

const translations = {
  copyLink: 'Copy Link',
  linkCopiedToClipboard: 'Copied',
};

export const AnchoredTitle = ({ title }) => {
  const [tooltipComponent, setTooltipComponent] = React.useState(CopyToClipboard)
  const id = title.replace(/\s+/g, '_');
  let fooRef = null;

  const onCopy = (event) => {
    setTooltipComponent(CopiedToClipboard);
    event.preventDefault();
    addons.getChannel().emit('navigateUrl', `#${id}`);
    setTimeout(() => {
      copy(new URL(window.parent.location as any).href)
    });
  }

  const onMouseEnter = () => ReactTooltip.show(fooRef);

  const onMouseLeave = () => {
    ReactTooltip.hide(fooRef)
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
        ref={ref => fooRef = ref}
        data-for={id}
        data-tip
        className={styles.linkIcon}
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
      <ReactTooltip id={id} effect="solid">{tooltipComponent}</ReactTooltip>
    </div>
  )
}