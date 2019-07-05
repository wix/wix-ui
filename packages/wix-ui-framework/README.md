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

see [docs/usage.md](docs/usage.md) for more details.

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
  --component-name <string>  Component name
  --description <string>     Component description
  --templates <string>       Path to templates. Default is "/generator/templates/"
  --output <string>          Path to output. If not set, output is determined by --templates folder structure
  --codemods <string>        Path to codemods. By default no codemods are run.
  -f, --force                Force component generation in a non clean git repo.
  -h, --help                 output usage information
```
---

## `wuf export-testkits`
 ```md
Usage: export-testkits [options]

Generate testkit export file

Options:
  --output <string>       Mandatory option to set where to write testkit exports file
  --definitions <string>  Path to testkit definitions. Default is ".wuf/testkit-definitions.js"
  --components <string>   Path to components.json file. Default is ".wuf/components.json"
  --template <string>     Path ejs template file. Default is ".wuf/testkits/template.ejs"
  -h, --help              output usage information
```
---

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
