// const fs = require('fs');
// const path = require('path');
// const DriverParser = require('./DriverParser');

// const BadgeTestKit = fs.readFileSync(path.resolve(path.join(__dirname, 'BadgeDriverString.txt')));
// const InputTestKit = fs.readFileSync(path.resolve(path.join(__dirname, 'InputDriverString.txt')));

// const result = new DriverParser(BadgeTestKit).parse();
// console.log(JSON.stringify(result, null, 2));

import AutoTestKit from './AutoTestKit';

export default AutoTestKit;
