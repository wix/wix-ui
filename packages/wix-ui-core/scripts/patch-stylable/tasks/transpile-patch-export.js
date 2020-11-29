const execa = require('execa');
const fs = require('fs');
const path = require('path');
const util = require('util');
const appendFile = util.promisify(fs.appendFileSync);

/**
 * This is a temporary addition of internal named parts until the Stylable CLI tool will support it
 * For this to be part of the stylesheet exports, we need to wait for this - https://github.com/wix/stylable/issues/1489 and this https://github.com/wix/stylable/issues/1484
 */
const addPopoverInternalParts = ({entryFile}) => {
  const popoverInternalParts = (isEs) => `
  :import {-st-from: "./dist/${isEs ? 'es/' : ''}src/components/popover/Popover.st.css";-st-named: arrow as Popover_arrow, withArrow as Popover_withArrow, popoverContent as Popover_popoverContent;}
  .root .Popover_arrow {}
  .root .Popover_withArrow {}
  .root .Popover_popoverContent {}
  `;
  
  return Promise.all([
    appendFile(path.resolve(`${entryFile}.st.css`), popoverInternalParts()),
    appendFile(path.resolve(`${entryFile}.es.st.css`), popoverInternalParts(true))
  ])
}


module.exports = function({folder, entryFile}) {  
  let entryFileCJS, entryFileES;


  const patchCJS = execa.command(
    `stc --srcDir="./src/${folder}/" --stcss=true --cjs=false --outDir="./dist/src/${folder}" --useNamespaceReference=true`,
  );

  const patchES = execa.command(
    `stc --srcDir="./src/${folder}/" --stcss=true --cjs=false --outDir="./dist/es/src/${folder}" --useNamespaceReference=true`,
  );

  if(entryFile) {
    entryFileCJS = execa.command(
      `stc --srcDir=./dist/src/${folder} --indexFile=${entryFile}.st.css`,
    );
  
   entryFileES = execa.command(
      `stc --srcDir=./dist/es/src/${folder} --indexFile=${entryFile}.es.st.css`,
    );
  }

 

  return Promise.all([patchCJS, patchES, entryFileCJS, entryFileES]).then(() => addPopoverInternalParts({entryFile}))
};
