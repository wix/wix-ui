import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {Container, Row, Col} from 'wix-style-react/Grid';
import {default as WixInput} from 'wix-style-react/Input';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Heading from 'wix-style-react/Heading';

import ComponentSource from '../../ComponentSource';
import List from './list';
import Option from './option';

import styles from './styles.scss';

const Wrapper = ({children}) =>
  <Container>
    <Row className={styles.wrapper}>
      {children}
    </Row>
  </Container>;

Wrapper.propTypes = {
  children: PropTypes.node
};


const Options = ({children}) =>
  <Col span={6}>
    {children}
  </Col>;

Options.propTypes = {
  children: PropTypes.node
};

const Preview = ({children, isRtl, onToggleRtl, isDarkBackground, onToggleBackground}) =>
  <Col span={6}>
    <div className={styles.title}>
      <Heading appearance="H2">Preview</Heading>

      <div className={styles.previewControls}>
        <div className={styles.previewControl}>
          Imitate RTL:&nbsp;

          <ToggleSwitch
            size="small"
            checked={isRtl}
            onChange={e => onToggleRtl(e.target.checked)}
            />
        </div>

        <div className={styles.previewControl}>
          Dark Background:&nbsp;

          <ToggleSwitch
            size="small"
            checked={isDarkBackground}
            onChange={e => onToggleBackground(e.target.checked)}
            />
        </div>
      </div>
    </div>

    <div
      {...{
        className: classnames(
          styles.preview,
          {
            rtl: isRtl,
            [styles.darkPreview]: isDarkBackground
          }
        ),
        ...(isRtl ? {dir: 'rtl'} : {})
      }}
      >
      {children}
    </div>
  </Col>;

Preview.propTypes = {
  children: PropTypes.node,
  isRtl: PropTypes.bool,
  isDarkBackground: PropTypes.bool,
  onToggleRtl: PropTypes.func,
  onToggleBackground: PropTypes.func
};


const Toggle = ({value, onChange, ...props}) =>
  <ToggleSwitch
    size="large"
    checked={value}
    onChange={({target: {checked}}) => onChange(checked)}
    {...props}
    />;

Toggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func
};

const Input = ({value, onChange, defaultValue, ...props}) =>
  <WixInput
    value={value}
    onChange={({target: {value}}) => onChange(value)}
    placeholder={defaultValue}
    {...props}
    />;

Input.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
};

const Code = ({component}) =>
  <Col span={12}>
    <div className={styles.title}>
      <Heading appearance="H2">Code</Heading>
    </div>

    <ComponentSource component={component}/>
  </Col>;

Code.propTypes = {
  component: PropTypes.node.isRequired
};

export {
  Wrapper,
  Options,
  Option,
  Preview,
  Toggle,
  Input,
  List,
  Code
};
