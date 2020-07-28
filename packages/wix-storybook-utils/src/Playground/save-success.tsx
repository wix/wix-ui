import React from 'react';

import LinkSmall from 'wix-ui-icons-common/LinkSmall';
import Close from 'wix-ui-icons-common/system/Close';

import { CopyButton } from '../CopyButton';

import styles from './styles.scss';

export const SaveSuccess = ({
  snippetId,
  formatUrl = (id: string) => `${window.parent.location.href}&snippet=${id}`,
  onClose,
}) => {
  const url = formatUrl(snippetId);

  return (
    <>
      {'Saved! '}
      <input
        onClick={e => (e.target as HTMLInputElement).select()}
        className={styles.urlPreview}
        readOnly
        type="text"
        value={url}
      />
      <CopyButton
        className={styles.copyButton}
        prefixIcon={<LinkSmall />}
        source={url}
      />
      <button className={styles.closeButton} onClick={onClose}>
        <Close />
      </button>
    </>
  );
};
