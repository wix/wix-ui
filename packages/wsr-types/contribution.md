## A typical component would look like this:

1. AddItem.d.ts
2. AddItem-tests.tsx
3. AddItem.driver.d.ts
4. AddItem.uni.driver.d.ts
5. enzyme.d.ts
6. puppeteer.d.ts
7. vanilla.d.ts

The following [commit](https://github.com/wix/wix-ui/pull/1570/commits/3ba044aae5992d747001a313f8f76350f5e3bf35) shows the files creation / modification for the AddItem type.


## Suggested flow:

1. Copy paste the first 4 files and run a case sensitive Find&Replace with your component - 
    1. addItem -> yourComponent
    1. AddItem -> YourComponent
2. TDD - Copy paste all prop types from the React component (from wix-style-react codebase) to yourComponent-tests.tsx. Start by commenting all props and one by one uncomment them and created the relevant type for them so the test pass.
3. Drivers  - If component has an old driver in wix-style-react, it should also have a type in here.
3. Testkits exports -  enzyme.d.ts, puppeteer.d.ts, vanilla.d.ts - Notice that you should export the suitable driver, we do not want to start exposing AddItem.uni.driver in the vanilla testkit if we are really using the old AddItem.driver.js in wix-style-react. You should check how it works in wix-style-react:
    1. https://github.com/wix/wix-style-react/blob/master/testkit/index.js
    2. https://github.com/wix/wix-style-react/blob/master/testkit/puppeteer.js
    3. https://github.com/wix/wix-style-react/blob/master/testkit/enzyme.js
