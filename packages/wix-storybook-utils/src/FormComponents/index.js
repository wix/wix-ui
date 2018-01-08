import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'deep-eql';
import classnames from 'classnames';

import {Container, Row, Col} from 'wix-style-react/Grid';
import {default as WixInput} from 'wix-style-react/Input';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import {default as WixRadioGroup} from 'wix-style-react/RadioGroup';
import Dropdown from 'wix-style-react/Dropdown';
import Text from 'wix-style-react/Text';

import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';

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


const Option = ({label, value, children, onChange}) => {
  return children ?
    (<Row className={styles.option}>
      <Col span={6}>
        <Markdown source={`\`${label}\``}/>
      </Col>

      <Col span={6}>
        {React.cloneElement(children, {value, onChange})}
      </Col>
    </Row>) : null;
};

Option.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  children: PropTypes.node,
  onChange: PropTypes.func
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


const List = ({value, values = [], onChange, ...props}) =>
  values.length > 3 ?
    <Dropdown
      options={values.map(v => ({id: v, value: v}))}
      selectedId={value}
      onSelect={({value}) => onChange(value)}
      /> :
    <WixRadioGroup
      value={value}
      onChange={onChange}
      {...props}
      >
      {values.map((value, i) =>
        <WixRadioGroup.Radio
          key={i}
          value={value}
          >
          <Markdown source={`\`${value}\``}/>
        </WixRadioGroup.Radio>
      )}
    </WixRadioGroup>;

List.propTypes = {
  value: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
};

class NodesList extends React.Component {
  view = e => typeof e === 'function' ? React.createElement(e) : e;

  render() {
    const {value = {}, values = [], onChange} = this.props;

    return values.length > 3 ?
      <Dropdown
        options={values.map((value, id) => ({id, value: this.view(value)}))}
        selectedId={values.findIndex(({type}) => isEqual(type, value.type)) || 0}
        onSelect={({value}) => onChange(value)}
        valueParser={({value}) => typeof value.type === 'string' ? value.type : value.type.name}
        /> :
        <WixRadioGroup
          value={this.state && this.state.selected}
          onChange={ev => {
            this.setState({selected: ev});
            onChange(this.view(values[ev]));
          }}
          >
          {values.map((value, i) =>
            <WixRadioGroup.Radio key={i} value={i}>
              {this.view(values[i])}
            </WixRadioGroup.Radio>
          )}
        </WixRadioGroup>;
  }
}

NodesList.propTypes = {
  value: PropTypes.node,
  values: PropTypes.arrayOf(PropTypes.any),
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

const Code = ({source}) =>
  <Col span={12}>
    <div className={styles.title}>
      <Text appearance="H2">Code</Text>
    </div>

    <CodeBlock source={source}/>
  </Col>;

Code.propTypes = {
  source: PropTypes.string
};

export {
  Wrapper,
  Options,
  Option,
  Preview,
  Toggle,
  Input,
  List,
  Code,
  NodesList
};
