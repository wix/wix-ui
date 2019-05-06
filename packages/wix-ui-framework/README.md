```
 __        ___   _ _____ 
 \ \      / / | | |  ___|
  \ \ /\ / /| | | | |_   
   \ V  V / | |_| |  _|  
    \_/\_/   \___/|_|    
                         
```

**WUF** - wix-ui-framework - CLI for common wix-ui libraries tasks

---

```
Usage: wuf [options] [command]

Options:
  -v, --version       output the version number
  -h, --help          output usage information

Commands:
  generate [options]  Scaffold file structure from templates
```

---

## `wuf generate`

```
Usage: generate [options]

Scaffold file structure from templates

Options:
  -f, --force                       Skip some pre-run checks. Use only if you know what you're doing
  --component-name <componentName>  Component name
  --description <description>       Component description
  --templates <templatesPath>       Path to templates. Default is "/generator/templates/"
  --codemods <codemodsPath>         Path to codemods. Default is "/generator/codemods/"
  -h, --help                        output usage information
```

Consult [readme](./generate/readme.md) for more details
