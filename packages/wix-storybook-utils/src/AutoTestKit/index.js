// import AutoTestKit from './AutoTestKit';

// export default AutoTestKit;

const fs = require('fs');
const path = require('path');
const stringify = require('json-stringify-safe');
const SuperParse = require('./DriverParser').DriverParser;
const parse = require('recast').parse;


const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => resolve(data));
    });
}

const files = {entry: './mock-testkits/Dropdown.driver'};

const getFileContent = (filePath) => {
    if (filePath.includes('scss')) {
        return;
    }
    const temp = filePath.split('/');
    const fileName = temp[temp.length - 1];

    return readFile(path.resolve(`./mock-testkits/${fileName}.txt`))
        .then(fileContents => {
            files[filePath] = fileContents;
            const programBody = parse(fileContents).program.body;
            const promises = [];
            programBody.forEach((declaration) => {
                if (declaration.type === 'ImportDeclaration') {
                    if (declaration.source.value[0] === '.') {
                        promises.push(getFileContent(declaration.source.value));
                    }
                }
            });
            return Promise.all(promises);
        })
}

getFileContent(files.entry).then(() => {
    console.log(Object.keys(files));
    const parser = new SuperParse(files);
    const answer = parser.parse();
});

// const stringifiedContent = stringify(parsed , null, 2);

// console.log(stringifiedContent);

// fs.writeFileSync('./test.txt', stringifiedContent);
