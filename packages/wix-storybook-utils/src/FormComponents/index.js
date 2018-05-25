import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {Container, Row, Col} from 'wix-style-react/Grid';
import {default as WixInput} from 'wix-style-react/Input';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Text from 'wix-style-react/Text';

import Markdown from '../Markdown';
import ComponentSource from '../ComponentSource';
import List from './list';

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
    <div className={styles.title}>
      <Text appearance="H2">Props</Text>
    </div>

    {children}
  </Col>;

Options.propTypes = {
  children: PropTypes.node
};

const Option = ({label, value, children, onChange, defaultValue, isRequired}) =>
  children ?
    <Row className={styles.option}>
      <Col span={6}>
        <Markdown source={`\`${label}${isRequired ? '*' : ''}\``}/>
      </Col>

      <Col span={6}>
        { React.cloneElement(
          children,
          {
            value: children.type === 'div' ? value.toString() : value,
            defaultValue,
            onChange,
            ...(children.type === 'div' ? {} : {isRequired}) // this is a hack to prevent warning im sorry, hopefully temporary,TODO
          }
        ) }
      </Col>
    </Row> :
    null;

Option.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  children: PropTypes.node,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool
};

const Preview = ({children, isRtl, onToggleRtl, isDarkBackground, onToggleBackground}) =>
  <Col span={6}>
    <div className={styles.title}>
      <Text appearance="H2">Preview</Text>

      <div className={styles.previewControls}>
        <div className={styles.previewControl}>
          Imitate RTL:&nbsp;

          <ToggleSwitch
            size="x-small"
            checked={isRtl}
            onChange={e => onToggleRtl(e.target.checked)}
            />
        </div>

        <div className={styles.previewControl}>
          Dark Background:&nbsp;

          <ToggleSwitch
            size="x-small"
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
    size="small"
    checked={value}
    onChange={({target: {checked}}) => onChange(checked)}
    {...props}
    />;

Toggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func
};

const Input = ({value, onChange, ...props}) =>
  <WixInput
    value={value}
    onChange={({target: {value}}) => onChange(value)}
    {...props}
    />;

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

const Code = ({component, displayName}) =>
  <Col span={12}>
    <div className={styles.title}>
      <Text appearance="H2">Code</Text>
    </div>

    <ComponentSource {...{component, displayName}}/>
  </Col>;

Code.propTypes = {
  component: PropTypes.node.isRequired,
  displayName: PropTypes.string.isRequired
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
