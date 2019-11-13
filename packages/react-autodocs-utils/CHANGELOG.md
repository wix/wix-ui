# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

#### Types of changes
* **Added** for new features.
* **Changed** for changes in existing functionality.
* **Deprecated** for soon-to-be removed features.
* **Removed** for now removed features.
* **Fixed** for any bug fixes.
* **Security** in case of vulnerabilities.

## [3.6.0] - 2019-11-12
### Changed
- `metadataMerger`, `pathFinder` & `prepareStory` - support es5 webpack loader [b4cc163](https://github.com/wix/react-autodocs-utils/commit/b4cc163)

## [3.5.7] - 2019-10-18
### Added
- `metadataParser` - support `@autodocs-component` identifier comment to force props parser for [1346e9c](https://github.com/wix/react-autodocs-utils/commit/1346e9c)

## [3.5.6] - 2019-09-18
### Fixed
- `testkitParser` - support import specifiers with local names, like `import { something as somethingElse } from '...';` [b3bb77f](https://github.com/wix/react-auto1346e9cdocs-utils/commit/b3bb77f)

## [3.5.5] - 2019-09-05
### Fixed
- `prepareStory` - fix function to support nested storyConfig objects [adca935](https://github.com/wix/react-autodocs-utils/commit/adca935)

## [3.5.4] - 2019-08-26
### Fixed
- `testkitParser` - remove `standalone/` parts from paths while parsing, according to convention [0477c39](https://github.com/wix/react-autodocs-utils/commit/0477c39)

## [3.5.3] - 2019-08-26
### Fixed
- `testkitParser` - some refactors and usage of full path as cwd (not dirnamed one) [dd3b723](https://github.com/wix/react-autodocs-utils/commit/dd3b723b71ea38fb5cbd8ae1ad3847a63d765bbd)

## [3.5.2] - 2019-08-21
### Fixed
- `reactDocgenParse` - pass filename to babel parser to prevent it from failing [c95e241](https://github.com/wix/react-autodocs-utils/commit/c95e241)

## [3.5.1] - 2019-08-21
### Fixed
- `followExports` - stop following exports when `export default` found [5d66cc3](https://github.com/wix/react-autodocs-utils/commit/5d66cc3458270cb1a634b7519f34b47a20101880)

## [3.5.0] - 2019-04-24
### Added
- add `tags` array to prop object with parsed jsdoc annotations [48f8b7ab](https://github.com/wix/react-autodocs-utils/commit/48f8b7abc2736efb454909f1ebc3f47f2acda9cf)

## [3.4.3] - 2019-04-10
### Fixed
- better resolve node_modules [c866860f](https://github.com/wix/react-autodocs-utils/commit/c866860f9bb96d1014a1d4679d51473267df8dce)

## [3.4.2] - 2019-02-13
### Changed
- allow  `pathFinder` to not include `componentPath` [#16](https://github.com/wix/react-autodocs-utils/pull/16)

## [3.4.1] - 2019-01-29
### Added
- add `dynamicImport` plugin to babel parser [#15](https://github.com/wix/react-autodocs-utils/pull/15)

## [3.4.0] - 2018-12-19
### Added
- Gather `README.API.md` files with the component metadata [#14](https://github.com/wix/react-autodocs-utils/pull/14)


## [3.3.0] - 2018-12-18
### Added
- support jsdoc type of annotations in testkit comments [#13](https://github.com/wix/react-autodocs-utils/pull/13)


## [3.2.0] - 2018-11-29
### Fixed
- various fixes for testkit parser
  [10](https://github.com/wix/react-autodocs-utils/pull/10)
  [11](https://github.com/wix/react-autodocs-utils/pull/11)
  [12](https://github.com/wix/react-autodocs-utils/pull/12)


## [3.1.3] - 2018-11-29
### Changed
- remove `console.warn` about React.Component [75e5813](https://github.com/wix/react-autodocs-utils/commit/75e58138b1b0722f8b317fcc169e261cd651466f)


## [3.1.2] - 2018-11-08
### Changed
- upgrade react-docgen dependency [3590ae33](https://github.com/wix/react-autodocs-utils/commit/3590ae332375074d3cfb322c5d536aa207151ab4)

## [3.1.1] - 2018-11-06
### Added
- resolve `withFocusable` hoc [967f1211](https://github.com/wix/react-autodocs-utils/commit/967f1211af5f9a46ae0736278886223eadb293df)


## [3.1.0] - 2018-09-24
### Added
- new `drivers` array in JSON output with component testkit metadata [#8](https://github.com/wix/react-autodocs-utils/pull/8)

### Types of changes
* **Added** for new features.
* **Changed** for changes in existing functionality.
* **Deprecated** for soon-to-be removed features.
* **Removed** for now removed features.
* **Fixed** for any bug fixes.
* **Security** in case of vulnerabilities.
