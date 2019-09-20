# Changelog

All notable changes are documented in this file.

Types of changes:

1. **Added** for new features.
1. **Changed** for changes in existing functionality.
1. **Deprecated** for soon-to-be removed features.
1. **Removed** for now removed features.
1. **Fixed** for any bug fixes.
1. **Security** in case of vulnerabilities.

# 3.3.0 - 2019-09-20
## Added
- `wuf generate` - support `component-name` in template files to generate kebab-case

# 3.2.0 - 2019-07-24
## Added
- `wuf exports-testkits` - support `toCamel`, `toKebab`, `toSnake`, `toPascal` utils in template

# 3.1.1 - 2019-07-16
## Added
- `wuf export-testkits` - add `tslint:disable` before warning banner

# 3.1.0 - 2019-07-09
## Changed
- `wuf export-testkits` - allow definitions file to have more entries than `components.json`
- `wuf update` - no longer overwrite `components.json`, merge it with new data instead

# 3.0.1 - 2019-07-05
## Changed
- `wuf export-testkits` - remove `factoryName`, `uniFactoryName`, `exportSuffix`, `exportCaseStyle` flags
- `wuf export-testkits` - make `definitions` file not required

# 3.0.0 - 2019-06-28
## Changed
- `wuf export-testkits` - support ejs template in `--template` file. Potentially breaking change

# 2.5.0 - 2019-06-25
## Added
- `wuf update` - support glob patterns in `--shape` file

# 2.4.1 - 2019-06-18
## Fixed
- `wuf generate` - fix `codemods` flag to correctly resolve relative path

# 2.4.0 - 2019-06-17
## Added
- `wuf export-testkits` - new `components`, `exportSuffix` & `exportCaseStyle` flags

# 2.3.0 - 2019-06-12
## Added
- `wuf generate` - new `--output` flag to set generated files path

## Changed
- `wuf generate` - change `--codemods` flag to be optional. By default no codemods will be run

# 2.2.0 - 2019-05-28
## Added
- `wuf export-testkits` - new `factoryName` & `uniFactoryName` flags

# 2.1.0 - 2019-05-27
## Added
- `wuf update --ignore` allow to ignore specific components from appearing in --output
- `mapTree` add `path` and `parent` to mapping function

# 2.0.0 - 2019-05-24
## Breaking
- a lot of internal refactoring which is potentially breaking users

## Added
- `wuf export-teskits` command
- `wuf update` command

# 1.2.1 - 2019-05-03
## Fixed
- prevent `jscodeshift` error

# 1.2.0 - 2019-05-03
## Changed
- refactor internals to use typescript

# 1.1.0 - 2019-05-02
## Added
- `wuf generate` script for generating components

# 1.1.0 - 2019-04-29
initial release
