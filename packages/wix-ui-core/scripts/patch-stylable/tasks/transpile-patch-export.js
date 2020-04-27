const execa = require('execa');


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

 

  return Promise.all([patchCJS, patchES, entryFileCJS, entryFileES]);
};
