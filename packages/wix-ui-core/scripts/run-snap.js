const {exec} = require('child_process');

if (!process.env.APPVEYOR || process.env.TRAVIS || ) {
  exec('npm run snap', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
} else {
  console.log(`Running ui-autotools snap utility requires setting the APPLITOOLS_API_KEY environment variable. If you would like to run autotools snap and cannot do so, please contact the maintainers of the wix-ui project.`);
}
