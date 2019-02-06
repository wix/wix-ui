const {execSync} = require('child_process');
console.log(execSync('git rev-parse --abbrev-ref HEAD').toString())