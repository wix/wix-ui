const {exec} = require('child_process');

if (!process.env.APPVEYOR) {
  exec('npm run snap', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}
