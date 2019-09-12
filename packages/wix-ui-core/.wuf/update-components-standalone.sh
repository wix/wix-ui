#!/usr/bin/env bash

# ensure output folder exists
mkdir -p drivers-standalone

# vanilla testkits
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/standalone-testkits/vanilla.template.ejs \
  --output drivers-standalone/vanilla.js

# vanilla testkits typescript definitions
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/standalone-testkits/vanilla-typescript.template.ejs \
  --output drivers-standalone/vanilla.d.ts


# protractor testkits
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/standalone-testkits/protractor.template.ejs \
  --output drivers-standalone/protractor.js

# protractor testkits typescript definitions
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/standalone-testkits/protractor-typescript.template.ejs \
  --output drivers-standalone/protractor.d.ts


# unidriver testkits
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/standalone-testkits/unidriver.template.ejs \
  --output drivers-standalone/unidriver.js

# unidriver testkits typescript definitions
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/standalone-testkits/unidriver-typescript.template.ejs \
  --output drivers-standalone/unidriver.d.ts
