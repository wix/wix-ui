import {Configuration, Linter, Replacement} from 'tslint';

export const helper = ({src, rule}) => {
    const linter = new Linter({fix: false});
    linter.lint('', src, Configuration.parseConfigFile({
        rules: {
            [rule.name || rule]: [true, ...rule.options]
        },
        rulesDirectory: 'src'
    }));
    return linter.getResult();
};

export const getFixedResult = ({src, rule}) => {
    const result = helper({src, rule});
    return Replacement.applyFixes(src, [result.failures[0].getFix()]);
};