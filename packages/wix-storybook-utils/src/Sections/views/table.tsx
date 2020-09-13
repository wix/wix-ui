import * as React from 'react';
import classNames from 'classnames';
import { TableSection } from '../../typings/story-section';
import Markdown from '../../Markdown';
import styles from './styles.scss';

export const table: (a: TableSection) => React.ReactNode = ({
  rows,
  headerTitles,
  transparentHeader,
}) => (
  <table
    className={classNames(styles.table, {
      [styles.transparentHeader]: transparentHeader,
    })}
  >
    {headerTitles && (
      <thead className={styles.thead}>
        <tr>
          {headerTitles.map((title, i) => (
            <th key={`th-${i}`} className={styles.th}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
    )}
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
