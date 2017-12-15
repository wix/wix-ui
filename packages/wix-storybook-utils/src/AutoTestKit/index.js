import AutoTestKit from './AutoTestKit';

export default AutoTestKit;


// TODO uncomment and run: node index.js (you need to be on this directory)
// const fs = require('fs');
// const path = require('path');
// const SuperParse = require('./DriverParser').DriverParser;
// const parse = require('recast').parse;
//
// const readFile = (filePath) => {
//   return new Promise((resolve) => {
//     fs.readFile(filePath, 'utf8', (err, data) => resolve(data));
//   });
// };
//
// const files = {entry: './mock-testkits/Badge.driver'};
//
// const getFileContent = filePath => {
//   if (filePath.includes('scss')) {
//     return;
//   }
//   const temp = filePath.split('/');
//   const fileName = temp[temp.length - 1];
//
//   console.log(fileName);
//   return readFile(path.resolve(`./mock-testkits/${fileName}.txt`))
//     .then(fileContents => {
//       files[filePath] = fileContents;
//       const programBody = parse(fileContents).program.body;
//       const promises = [];
//       programBody.forEach((declaration) => {
//         if (declaration.type === 'ImportDeclaration') {
//           if (declaration.source.value[0] === '.') {
//             promises.push(getFileContent(declaration.source.value));
//           }
//         }
//       });
//       return Promise.all(promises);
//     });
// };
//
//
// getFileContent(files.entry).then(() => {
//   const parser = new SuperParse(files);
//   const answer = parser.parse();
//
//   const stringifiedContent = JSON.stringify(answer, null, 2);
//
//   console.log(stringifiedContent);
//
//   fs.writeFileSync('./test.txt', stringifiedContent);
// });
