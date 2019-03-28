import * as React from 'react';

import { TableSection } from '../../typings/story-section';
import Markdown from '../../Markdown';
import styles from './styles.scss';

export const table: (a: TableSection) => React.ReactNode = ({ rows }) => (
  <table className={styles.table}>
    <tbody>
      {rows.map((row, i) => (
        <tr key={`tr-${i}`} className={styles.tr}>
          {row.map((cell, j) => (
            <td key={`td-${i}-${j}`} className={styles.td}>
              {typeof cell === 'string' ? (
                <Markdown source={cell} className={styles.tableMarkdown} />
              ) : (
                cell
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
