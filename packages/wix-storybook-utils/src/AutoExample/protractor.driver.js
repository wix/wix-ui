module.exports = {
  setProps: props => {
    const script = componentProps => {
      // for `browser.executeScript(fn, args)`:
      // * `fn` - function to run in browser context
      // * `args` - arguments to pass to `fn`
      //
      // unfortunately `args` can be only bool, number or string
      // and here we... hack a little to try and support more
      const parsers = [
        {
          rule: value => value.toString() === '[object Object]',
          parser: value => value,
        },
        {
          rule: value =>
            typeof value === 'string' && value.match(/^function|\(\)\s?=>/),
          /* tslint:disable */
          parser: value => eval(`(${value})`), // eslint-disable-line no-eval
          /* tslint:enable */
        },
        {
          rule: value => Array.isArray(value),
          parser: value => value,
        },
        {
          rule: value => typeof value === 'string' && !isNaN(Date.parse(value)),
          parser: value => new Date(value),
        },
        {
          rule: value => typeof value === 'string',
          parser: value => value,
        },
        {
          // default
          rule: () => true,
          parser: value => JSON.parse(value),
        },
      ];

      const args = Object.keys(componentProps).reduce((allProps, key) => {
        const { parser } = parsers.find(({ rule }) => rule(allProps[key]));
        props[key] = parser(allProps[key]);
        return allProps;
      }, componentProps);

      // this is possible because:
      // <AutoExample ref={ref => window.autoexample = ref}/>
      window.autoexample.setState({
        propsState: { ...window.autoexample.state.propsState, ...args },
      });
    };

    return browser.executeScript(script, props);
  },
  reset: () => {
    return browser.executeScript('window.autoexample.resetState()');
  },
  remount: () => {
    return browser.executeScript('window.story.remount()');
  },
};
