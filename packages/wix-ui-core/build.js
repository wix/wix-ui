"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@stylable/core");
var node_1 = require("@stylable/node");
var path_1 = require("path");
var find_files_1 = require("./find-files");
function build(_a) {
    console.warn('HELLLLOOOO')
    var extension = _a.extension, fs = _a.fs, stylable = _a.stylable, rootDir = _a.rootDir, srcDir = _a.srcDir, outDir = _a.outDir, log = _a.log, diagnostics = _a.diagnostics, indexFile = _a.indexFile, generatorPath = _a.generatorPath;
    return __awaiter(this, void 0, void 0, function () {
        var generatorModule, generator, blacklist, fullSrcDir, fullOutDir, filesToBuild, assets, diagnosticsMsg, indexFileOutput, nameMapping;
        return __generator(this, function (_b) {
            generatorModule = generatorPath ? require(path_1.resolve(generatorPath)) : require('./default-generator');
            generator = new generatorModule.Generator();
            blacklist = new Set(['node_modules']);
            fullSrcDir = path_1.join(rootDir, srcDir);
            fullOutDir = path_1.join(rootDir, outDir);
            filesToBuild = find_files_1.findFiles(fs, fullSrcDir, extension, blacklist).result;
            assets = [];
            diagnosticsMsg = [];
            indexFileOutput = [];
            nameMapping = {};
            if (filesToBuild.length === 0) {
                log('[Build]', 'No stylable files found. build skipped.');
            }
            else {
                log('[Build]', "Building " + filesToBuild.length + " stylable files.");
            }
            filesToBuild.forEach(function (filePath) {
                indexFile
                    ? generateFileIndexEntry(filePath, nameMapping, log, indexFileOutput, fullOutDir, generator)
                    : buildSingleFile(fullOutDir, filePath, fullSrcDir, log, fs, stylable, diagnostics, diagnosticsMsg, assets);
            });
            if (indexFile && indexFileOutput.length) {
                generateIndexFile(indexFileOutput, fullOutDir, indexFile, log, fs);
            }
            if (diagnostics && diagnosticsMsg.length) {
                diagnostics(diagnosticsMsg.join('\n\n'));
            }
            if (!indexFile) {
                handleAssets(assets, rootDir, srcDir, outDir, fs);
            }
            return [2 /*return*/];
        });
    });
}
exports.build = build;
function generateIndexFile(indexFileOutput, fullOutDir, indexFile, log, fs) {
    var indexFileContent = indexFileOutput
        .map(function (_) { return createImportForComponent(_.from, _.name); })
        .join('\n');
    var indexFileTargetPath = path_1.join(fullOutDir, indexFile);
    log('[Build]', 'creating index file: ' + indexFileTargetPath);
    ensureDirectory(fullOutDir, fs);
    tryRun(function () { return fs.writeFileSync(indexFileTargetPath, '\n' + indexFileContent + '\n'); }, 'Write Index File Error');
}
function handleAssets(assets, rootDir, srcDir, outDir, fs) {
    var projectAssetMapping = {};
    assets.forEach(function (originalPath) {
        projectAssetMapping[originalPath] = originalPath.replace(path_1.join(rootDir, srcDir), path_1.join(rootDir, outDir));
    });
    ensureAssets(projectAssetMapping, fs);
}
function buildSingleFile(fullOutDir, filePath, fullSrcDir, log, fs, stylable, diagnostics, diagnosticsMsg, projectAssets) {
    // testBuild(filePath, fullSrcDir, fs);
    var outSrcPath = path_1.join(fullOutDir, filePath.replace(fullSrcDir, ''));
    var outPath = outSrcPath + '.js';
    var fileDirectory = path_1.dirname(filePath);
    var outDirPath = path_1.dirname(outPath);
    log('[Build]', filePath + ' --> ' + outPath);
    tryRun(function () { return ensureDirectory(outDirPath, fs); }, "Ensure directory: " + outDirPath);
    var content = tryRun(function () { return fs.readFileSync(filePath).toString(); }, "Read File Error: " + filePath);
    var res = stylable.transform(content, filePath);
    var code = tryRun(function () { return node_1.generateModuleSource(res, true); }, "Transform Error: " + filePath);
    handleDiagnostics(diagnostics, res, diagnosticsMsg, filePath);
    // st.css
    tryRun(function () { return fs.writeFileSync(outSrcPath, content); }, "Write File Error: " + outSrcPath);
    // st.css.js
    tryRun(function () { return fs.writeFileSync(outPath, code); }, "Write File Error: " + outPath);
    projectAssets.push.apply(projectAssets, res.meta.urls.filter(core_1.isAsset).map(function (uri) { return path_1.resolve(fileDirectory, uri); }));
}
// function testBuild(filePath: string, fullSrcDir: string, fs: any) {
//     debugger;
//     const x = dt({
//         filename: 'C:\\projects\\stylable\\packages\\cli\\test\\fixtures\\deps\\comp.js',
//         directory: 'C:\\projects\\stylable\\packages\\cli\\test\\fixtures',
//         // requireConfig: 'path/to/requirejs/config', // optional
//         // webpackConfig: 'path/to/webpack/config', // optional
//         // nodeModulesConfig: {
//         //     entry: 'module'
//         // }, // optional
//         filter: (path: string) => path.indexOf('node_modules') === -1,
//         nonExistent: [] // optional
//     });
//     console.log(x);
//     class StylableModuleEmit {
//         public apply(compiler: any) {
//             compiler.hooks.emit.tap('StylableModuleEmit', (_c: any) => {
//                 debugger;
//             });
//         }
//     }
//     const c = webpack({
//         entry: filePath,
//         context: fullSrcDir,
//         mode: 'production',
//         plugins: [
//             {
//                 apply(c: any) {
//                     c.inputFileSystem = fs;
//                     c.outputFileSystem = fs;
//                 }
//             },
//             new StylableWebpackPlugin(),
//             new StylableModuleEmit()
//         ]
//     });
//     c.run((_e: any, _s: any) => {
//         debugger;
//     });
// }
function generateFileIndexEntry(filePath, nameMapping, log, indexFileOutput, fullOutDir, generator) {
    var name = generator.generateImport(filePath).default;
    if (nameMapping[name]) {
        // prettier-ignore
        throw new Error("Name Collision Error: " + nameMapping[name] + " and " + filePath + " has the same filename");
    }
    log('[Build Index]', "Add file: " + filePath);
    nameMapping[name] = filePath;
    indexFileOutput.push({
        name: name,
        from: addDotSlash(path_1.relative(fullOutDir, filePath))
    });
}
function handleDiagnostics(diagnostics, res, diagnosticsMsg, filePath) {
    var reports = res.meta.transformDiagnostics ?
        res.meta.diagnostics.reports.concat(res.meta.transformDiagnostics.reports) :
        res.meta.diagnostics.reports;
    if (diagnostics && reports.length) {
        diagnosticsMsg.push("Errors in file: " + filePath);
        reports.forEach(function (report) {
            var err = report.node.error(report.message, report.options);
            diagnosticsMsg.push([report.message, err.showSourceCode()].join('\n'));
        });
    }
}
function tryRun(fn, errorMessage) {
    try {
        return fn();
    }
    catch (e) {
        throw new Error(errorMessage + ': \n' + e.stack);
    }
}
function createImportForComponent(from, defaultName) {
    return [
        ":import {-st-from: " + JSON.stringify(from) + ";-st-default:" + defaultName + ";}",
        ".root " + defaultName + "{}"
    ].join('\n');
}
function addDotSlash(p) {
    p = p.replace(/\\/g, '/');
    return p.charAt(0) === '.' ? p : './' + p;
}
function ensureDirectory(dir, fs) {
    if (dir === '.' || fs.existsSync(dir)) {
        return;
    }
    try {
        fs.mkdirSync(dir);
    }
    catch (e) {
        var parentDir = path_1.dirname(dir);
        if (parentDir !== dir) {
            ensureDirectory(parentDir, fs);
            fs.mkdirSync(dir);
        }
    }
}
function ensureAssets(projectAssetsMap, fs) {
    Object.keys(projectAssetsMap).map(function (assetOriginalPath) {
        if (fs.existsSync(assetOriginalPath)) {
            var content = fs.readFileSync(assetOriginalPath);
            var targetPath = projectAssetsMap[assetOriginalPath];
            var targetDir = path_1.dirname(targetPath);
            ensureDirectory(targetDir, fs);
            fs.writeFileSync(targetPath, content);
        }
    });
}
exports.ensureAssets = ensureAssets;
//# sourceMappingURL=build.js.map