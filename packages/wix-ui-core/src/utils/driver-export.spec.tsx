const glob = require('glob');
const path = require('path');

const formattDriverExport = driverPath => {
    const compName = path.parse(driverPath).base
    const formattedCompName = compName.charAt(0).toLowerCase() + compName.slice(1) + 'DriverFactory'
    return formattedCompName.replace(/-([a-z])/g, function (m, w) {
      return w.toUpperCase();
    });
};

describe('Components drivers exports', () => {
    const exportedDrivers = glob.sync('./src/components/*').map(driverPath => formattDriverExport(driverPath))
    const componentsWithoutDrivers = ['avatarDriverFactory', 'stepperDriverFactory', 'stylableBadgeDriverFactory', 'videoDriverFactory']
    const componentsWithoutProtractorDrivers = ['iconWithOptionsDriverFactory', 'menuItemDriverFactory', 'buttonNextDriverFactory']
    for (let i = 0; i < exportedDrivers.length; i++) { 
        if (!componentsWithoutDrivers.includes(exportedDrivers[i])){
            it(`include ${exportedDrivers[i]} exported path`, async () => {
                const { [exportedDrivers[i]]: testedExport } = await import('../../drivers/vanilla');
                expect(testedExport).toBeDefined();
            });
    
            if (!componentsWithoutProtractorDrivers.includes(exportedDrivers[i])){
                it(`include ${exportedDrivers[i]} protractor exported path`, async () => {
                    const { [exportedDrivers[i]]: testedProtractorDriverExport} = await import('../../drivers/protractor');
                    expect(testedProtractorDriverExport).toBeDefined();
                });
            }
        }
     };
});