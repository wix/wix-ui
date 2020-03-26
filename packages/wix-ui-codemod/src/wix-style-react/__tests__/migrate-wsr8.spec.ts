import { defineTest } from 'jscodeshift/src/testUtils';

defineTest(__dirname, 'migrate-wsr8', {}, 'migrate-wsr8/components');
defineTest(__dirname, 'migrate-wsr8', {}, 'migrate-wsr8/card-header');
defineTest(__dirname, 'migrate-wsr8', {}, 'migrate-wsr8/imports');
