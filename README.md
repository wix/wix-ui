# wix-ui
> Wix's React component library

## Documentation
Project documentation can be found here
- [wix-ui-core](http://wix-wix-ui-core.surge.sh)
- [wix-ui-icons-common](http://wix-wix-ui-icons-common.surge.sh)


## Getting started
start development on `wix-ui-core`:
```
git clone git@github.com:wix/wix-ui.git
cd wix-ui/packages/wix-ui-core
npm install
npm start
```

## Running tests

### Component (unit) tests
We use Mocha runner in browser.

- `npm run test:browser` - to run all components' test in browser.
- `npm run test:browser -- --watch` - to run all components' test in browser, with a visible browser.
  - Click a Component name in the right panel, to run nly it's tests.
  - To run a specific test case, use the Mocha support `it.only` in the test code.
  
## **What themes are?**
Read [here](./docs/WHAT_ARE_THEMES.md)

## **How do themes work?**
Read here about [themes structure and architecture](./docs/THEMES_STRUCTURE.md)

