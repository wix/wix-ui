import * as React from 'react';
import { TableSection } from '../../typings/story-section';

const Markdown = require('../../Markdown').default;

const styles = require('./styles.scss');

export const table: (a: TableSection) => React.ReactNode = ({ rows }) => {
  return (
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
};
