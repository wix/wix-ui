#!/usr/bin/env bash

# create components list
wuf update \
  --shape .wuf/required-component-files.json \
  --components src/components \
  --max-mismatch 1 \
  --exclude "deprecated" \
  --output .wuf/components.json

# vanilla testkits
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/testkits/vanilla.template.ejs \
  --output drivers/vanilla.js


# protractor testkits
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/testkits/protractor.template.ejs \
  --output drivers/protractor.js


# unidriver testkits
wuf export-testkits \
  --components .wuf/components.json \
  --definitions .wuf/testkits/definitions.js \
  --template .wuf/testkits/unidriver.template.ejs \
  --output drivers/unidriver.js

