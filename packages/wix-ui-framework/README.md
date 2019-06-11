```
 __        ___   _ _____ 
 \ \      / / | | |  ___|
  \ \ /\ / /| | | | |
   \ V  V / | |_| |  _|
    \_/\_/   \___/|_|

```

> **w**ix-**u**i-**f**ramework

command line tool for common wix-ui libraries tasks

---

# Install

`npm install wix-ui-framework`

# Use

```
wuf --help
wuf generate --help
wuf export-testkits --help
wuf update --help
```

## `wuf`

```md
Usage: wuf [options] [command]

Options:
  -v, --version              output the version number
  -h, --help                 output usage information

Commands:
  generate [options]         Scaffold file structure from templates
  export-testkits [options]  Generate testkit export file
  update [options]           Update components list file
```

---

## `wuf generate`

```md
Usage: generate [options]

Scaffold file structure from templates

Options:
  --component-name <ComponentName>  Component name
  --description <description>       Component description
  --templates <string>              Path to templates. Default is "/generator/templates/"
  --codemods <string>               Path to codemods. Default is "/generator/codemods/"
  -f, --force                       Force component generation in a non clean git repo.
  -h, --help                        output usage information
```

Consult [readme](./src/cli-commands/generate/readme.md) for more

## `wuf export-testkits`

```md
Usage: export-testkits [options]

Generate testkit export file

Options:
  --output <string>          Mandatory option to set where to write testkit exports file
  --definitions <string>     Path to testkit definitions. Default is ".wuf/testkit-definitions.js"
  --factoryName <string>     Name of a testkit factory creator. Default is "testkitFactoryCreator"
  --uniFactoryName <string>  Name of a unidriver testkit factory creator. Default is "uniTestkitFactoryCreator"
  --template <string>        Path to template. Default is ".wuf/testkits/template.js"
  -h, --help                 output usage information
```

## `wuf update`

```md
Usage: update [options]

Update components list file

Options:
  --shape <string>         Path to json file describing folder structure of required files. Default is `.wuf/required-component-files.json`
  --components <string>    Path to folder where components reside. Default is `src/components`
  --output <string>        Path to output file. Default is `.wuf/components.json`
  --exclude <string>       Regular expression of known paths to exclude. For example --exclude (Button|Table). Default is undefined
  --max-mismatch <number>  Optional number of maximum mismatches between shape defined in required-component-files.json and component. Default is 0
  -h, --help               output usage information
```
