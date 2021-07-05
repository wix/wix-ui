import React, { useState, useRef } from 'react';
import addons from '@storybook/addons';
import copy from 'copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import { LinkSmall, ConfirmSmall } from 'wix-ui-icons-common';

import Markdown from '../Markdown';
import styles from './styles.scss';
import sectionWithSiblingsStyles from '../Sections/section-with-siblings/styles.scss'

const translations = {
    copyLink: 'Copy Link',
    linkCopiedToClipboard: 'Copied',
};

export const AnchoredTitle = ({ title, children = null }) => {
    const [copied, setCopied] = useState(false);
    const id = title.replace(/\s+/g, '_');
    const copyLinkRef = useRef(null);

    const onCopy = (event: React.MouseEvent) => {
        event.preventDefault();

        setCopied(true);
        addons.getChannel().emit('navigateUrl', `#${id}`);
        setTimeout(() => {
            copy(new URL(window.parent.location as any).href);
        });
    };

    const onMouseEnter = () => ReactTooltip.show(copyLinkRef.current);

    const onMouseLeave = () => {
        ReactTooltip.hide(copyLinkRef.current);
        setCopied(false);
    };

    const isChildren = React.Children.count(children) > 0;

    const onAnchorClicked = event => isChildren? onCopy(event): event.preventDefault();

    return (
        <div
            className={styles.titleContainer}
            onClick={!isChildren && onCopy}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <a
                ref={copyLinkRef}
                data-for={id}
                data-tip
                className={styles.link}
                id={id}
                href={`#${id}`}
                target="_self"
                onClick={onAnchorClicked}
            >
                <LinkSmall />
            </a>
            { isChildren ?
                children :
                <Markdown
                    key="title"
                    className={sectionWithSiblingsStyles.title}
                    source={title}
                />
            }
            <ReactTooltip
                id={id}
                effect="solid"
                arrowColor="transparent"
                offset={{ top: -5 }}
                className={styles.tooltip}
            >
                {copied && <ConfirmSmall />}
                {copied ? translations.linkCopiedToClipboard : translations.copyLink}
            </ReactTooltip>
        </div>
    );
};
