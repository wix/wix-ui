import {Configuration, Linter, Replacement} from 'tslint';

const DEFAULT_RULES_DIRECTORY = 'src';

export const helper = ({src, rule, rulesDirectory = DEFAULT_RULES_DIRECTORY}) => {
    const linter = new Linter({fix: false});
    linter.lint('', src, Configuration.parseConfigFile({
        rules: {
            [rule.name || rule]: [true, ...rule.options]
        },
        rulesDirectory,
    }));
    return linter.getResult();
};

export const getFixedResult = ({src, rule, rulesDirectory = DEFAULT_RULES_DIRECTORY}) => {
    const result = helper({src, rule, rulesDirectory});
    return Replacement.applyFixes(src, [result.failures[0].getFix()]);
};
