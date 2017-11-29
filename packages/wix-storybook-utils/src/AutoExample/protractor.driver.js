export default {
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
          rule: value => typeof value === 'string' && value.match(/^function|\(\)\s?=>/),
          parser: value => eval(`(${value})`) // eslint-disable-line no-eval
        },
        {
          rule: value => typeof value === 'string' || Array.isArray(value),
          parser: value => value
        },
        { // default
          rule: () => true,
          parser: value => JSON.parse(value)
        }
      ];

      const args = Object
        .keys(componentProps)
        .reduce(
          (props, key) => {
            const {parser} = parsers.find(({rule}) => rule(props[key]));
            props[key] = parser(props[key]);
            return props;
          },
          componentProps
        );

      // this is possible because:
      // <AutoComplete ref={ref => window.autoexample = ref}/>
      window.autoexample.setState({
        propsState: Object.assign({}, window.autoexample.state.propsState, args)
      });
    };

    browser.executeScript(script, props);
  },
  reset: () =>
    browser.executeScript('window.autoexample.resetState()')
};
