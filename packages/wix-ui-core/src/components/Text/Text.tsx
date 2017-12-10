import * as React from 'react';
import PropTypes from 'prop-types';
// import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';
// import typography, {convertFromUxLangToCss} from '../Typography';
// import styles from './styles.scss';


/**
  * General all purpose text component with Wix styling.
  *
  * Adds correct styling so you don't have to.
  *
  * Renders correct element (either `span` or `h1` - `h5`) depending on `appearance` (defaults to `span`)
  */
export default class extends  React.PureComponent<any> {
  static displayName = 'Text';

  static propTypes = {
    /** a name of appearance to apply */
    appearance: PropTypes.oneOf([
      'H0', 'H1', 'H1.1', 'H2', 'H2.1', 'H3', 'H4',
      'T1', 'T1.1', 'T1.2', 'T1.3', 'T1.4',
      'T2', 'T2.1', 'T2.2', 'T2.3',
      'T3', 'T3.1', 'T3.2', 'T3.3', 'T3.4',
      'T4', 'T4.1', 'T4.2', 'T4.3',
      'T5', 'T5.1']),

    /** should the text be ellipsed or not */
    ellipsis: PropTypes.bool,

    /** should hide the title tooltip that is shown on mouse hover when using the ellipsis prop */
    forceHideTitle: PropTypes.bool,

    /** any nodes to be rendered (usually text nodes) */
    children: PropTypes.node
  }

  static defaultProps = {
    appearance: 'T1.1'
  }

  getTitle = () => {
    const {forceHideTitle, ellipsis, children} = this.props;

    return typeof children === 'string' && ellipsis && !forceHideTitle ?
      children :
      null;
  }

  getType = appearance =>
     [
      {type: 'h1', candidates: ['H0']},
      {type: 'h2', candidates: ['H1', 'H1.1']},
      {type: 'h3', candidates: ['H2', 'H2.1']},
      {type: 'h4', candidates: ['H3']},
      {type: 'h5', candidates: ['H4']}
     ]
      .filter(({candidates}) => candidates.indexOf(appearance) !== -1)
      .reduceRight((acc, {type}) => type, 'span');


  getClassNames = appearance => 
    [
      {className: styles.headingDefaults, candidates: ['H0', 'H1', 'H1.1', 'H2', 'H2.1', 'H3', 'H4']}
    ]
      .filter(({candidates}) => candidates.indexOf(appearance) !== -1)
      .reduce((acc, {className}) =>
        acc.concat(className),
        [typography[convertFromUxLangToCss(appearance)]])
      .join(' ');

  render() {
    const {appearance, ellipsis, children} = this.props;

    return React.createElement(
      this.getType(appearance),
      {
        title: this.getTitle(),
        className: classNames(
          this.getClassNames(appearance),
          {[styles.ellipsis]: ellipsis}
        )
      },
      children
    );
  }
}
