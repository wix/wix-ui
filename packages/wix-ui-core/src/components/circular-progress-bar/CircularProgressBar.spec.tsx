import React from 'react';
import { circularProgressBarDriverFactory } from './CircularProgressBar.driver';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { CircularProgressBar } from './';
import { CircularProgressBarProps } from './CircularProgressBar';
import { runTestkitExistsSuite } from '../../common/testkitTests';
import { circularProgressBarTestkitFactory } from '../../testkit';
import { circularProgressBarTestkitFactory as enzymeCircularProgressBarTestkitFactory } from '../../testkit/enzyme';
import { circularProgressBarUniDriverFactory } from './CircularProgressBar.uni.driver';


// describe('CircularProgressBar', () => {
//   const createDriver = new ReactDOMTestContainer()
//     .unmountAfterEachTest()
//     .createLegacyRenderer(circularProgressBarDriverFactory);
//
//   const defaultProps = {
//     value: 40,
//   };
//
    //TODO: done
//   it('should exist', () => {
//     const driver = createDriver(<CircularProgressBar {...defaultProps} />);
//     expect(driver.exists()).toBe(true);
//   });

//      TODO: done
//
//   it('should show success icon when reaching 100%', () => {
//     const driver = createDriver(
//       <CircularProgressBar
//         {...{ ...defaultProps, value: 100, successIcon: <div /> }}
//       />,
//     );
//     expect(driver.isSuccessIconDisplayed()).toBe(true);
//   });

//
//   it('should not show percentages value when showProgressIndication is false', () => {
//     const driver = createDriver(
//       <CircularProgressBar {...{ ...defaultProps, value: 50 }} />,
//     );
//     expect(driver.isPercentagesProgressDisplayed()).toBe(false);
//   });


//      TODO: done
//   it('should show error icon on failure', () => {
//     const driver = createDriver(
//       <CircularProgressBar
//         {...{ ...defaultProps, error: true, errorIcon: <div /> }}
//       />,
//     );
//     expect(driver.isErrorIconDisplayed()).toBe(true);
//   });
//
//   describe('when with progress indication', () => {
//     let driver;
//     let props: CircularProgressBarProps = defaultProps;
//
//     beforeEach(() => {
//       props = { ...defaultProps, showProgressIndication: true };
//     });
//
//      TODO: done
//     it('should show success icon when reaching 100% and value passed as string', () => {
//       driver = createDriver(
//         <CircularProgressBar
//           {...{ ...props, value: '100' as any, successIcon: <div /> }}
//         />,
//       );
//       expect(driver.isSuccessIconDisplayed()).toBe(true);
//     });
//
        //TODO: done
//     it('should show success icon and percentage when reaching 100%', () => {
//       driver = createDriver(
//         <CircularProgressBar
//           {...{ ...props, value: 100, successIcon: <div /> }}
//         />,
//       );
//       expect(driver.isSuccessIconDisplayed()).toBe(true);
//       expect(driver.getValue()).toBe('100%');
//     });
//
        //TODO: done
//     it('should show percentages value of 100 when passing value above 100', () => {
//       driver = createDriver(
//         <CircularProgressBar
//           {...{ ...props, value: 140, successIcon: <div /> }}
//         />,
//       );
//       expect(driver.isSuccessIconDisplayed()).toBe(true);
//       expect(driver.getValue()).toBe('100%');
//     });
//
        //TODO: done
//     it('should show percentage when error label and icon are not provided', () => {
//       driver = createDriver(
//         <CircularProgressBar
//           {...{ ...props, value: 33, error: true, errorIcon: null }}
//         />,
//       );
//       expect(driver.isErrorIconDisplayed()).toBe(false);
//       expect(driver.getValue()).toBe('33%');
//     });

//      TODO: done//
//     it('should show errorLabel when error icon is not provided', () => {
//       driver = createDriver(
//         <CircularProgressBar
//           {...{
//             ...props,
//             value: 33,
//             error: true,
//             errorLabel: 'Failed',
//             errorIcon: null,
//           }}
//         />,
//       );
//       expect(driver.isErrorIconDisplayed()).toBe(false);
//       expect(driver.getValue()).toBe('Failed');
//     });
//
//     it('should show error icon and percentage when encountering an error without an errorLabel', () => {
//       driver = createDriver(
//         <CircularProgressBar
//           {...{ ...props, value: 100, error: true, errorIcon: <div /> }}
//         />,
//       );
//       expect(driver.isErrorIconDisplayed()).toBe(true);
//       expect(driver.getValue()).toBe('100%');
//     });
//
//     it('should show error icon and errorLabel when encountering an error', () => {
//       driver = createDriver(
//         <CircularProgressBar
//           {...{
//             ...props,
//             value: 100,
//             error: true,
//             errorLabel: 'Failed',
//             errorIcon: <div />,
//           }}
//         />,
//       );
//       expect(driver.isErrorIconDisplayed()).toBe(true);
//       expect(driver.getValue()).toBe('Failed');
//     });
//
//     it('should show percentages value while in progress', () => {
//       driver = createDriver(
//         <CircularProgressBar {...{ ...props, value: 50 }} />,
//       );
//       expect(driver.getValue()).toBe('50%');
//     });
//
//     it('should show percentages value of 0 when passing value below 0', () => {
//       driver = createDriver(
//         <CircularProgressBar {...{ ...props, value: -1 }} />,
//       );
//       expect(driver.getValue()).toBe('0%');
//     });
//
//     it('should show percentages value of 0 when not passing a value', () => {
//       driver = createDriver(
//         <CircularProgressBar {...{ showProgressIndication: true }} />,
//       );
//       expect(driver.getValue()).toBe('0%');
//     });
//
//     it('should show value in percentages rounded down', () => {
//       const floatValue = 3.9;
//       const floatValueRoundDown = Math.floor(floatValue);
//
//       driver = createDriver(
//         <CircularProgressBar {...{ ...props, value: floatValue }} />,
//       );
//       expect(driver.getValue()).toBe(`${floatValueRoundDown}%`);
//     });
//   });
//
//   runTestkitExistsSuite({
//     Element: <CircularProgressBar value={0} />,
//     testkitFactory: circularProgressBarTestkitFactory,
//     enzymeTestkitFactory: enzymeCircularProgressBarTestkitFactory,
//   });
// });


const createCircularProgressBar = (props = {}) => {
    return <CircularProgressBar {...props} />;
};

describe( 'CircularProgressBar' , () => {

    const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

    const defaultProps = {
        value: 40,
    };

    describe('[sync]', () => {
        runTests(testContainer.createLegacyRenderer(circularProgressBarDriverFactory));
    });

    describe('[async]', () => {
        runTests(testContainer.createUniRenderer(circularProgressBarUniDriverFactory));
    });

    function runTests(render) {

        it('should render', async () => {
            const {driver} = render(createCircularProgressBar({...defaultProps}));
            expect(await driver.exists()).toBe(true);
        });

        describe('on completion', () => {

            it('should display success icon when reaching 100% and value passed as NUMBER', async () => {
                const successProps = {
                    value: 100,
                    showProgressIndication: true,
                    successIcon: <div/>,
                };

                const driver = render(createCircularProgressBar({...successProps}));
                expect(await driver.isSuccessIconDisplayed()).toBe(true);
            });

            it('should display success icon when reaching 100% and value passed as STRING', async () => {
                const successProps = {
                    value: '100' as any,
                    showProgressIndication: true,
                    successIcon: <div/>,
                };


                const driver = render(createCircularProgressBar({...successProps}));
                expect(await driver.isSuccessIconDisplayed()).toBe(true);
            });


            it('should display "100%" percentage when reaching 100%', async () => {
                const successProps = {
                    value: 100,
                    successIcon: <div/>,
                };
                const driver = render(createCircularProgressBar({...successProps}));
                expect(await driver.getValue()).toBe('100%');
            });


            it('should display "100%" percentage when passing value above 100', async () => {
                const successProps = {
                    value: 140,
                    successIcon: <div/>,
                };
                const driver = render(createCircularProgressBar({...successProps}));
                expect(await driver.getValue()).toBe('100%');
            });

            it('should display success icon when passing value above 100', async () => {
                const successProps = {
                    value: 140,
                    successIcon: <div/>,
                };
                const driver = render(createCircularProgressBar({...successProps}));
                expect(await driver.isSuccessIconDisplayed()).toBe(true);
            });
        });

        describe('on error', () => {

            it('should display error icon', async () => {
                const errorProps = {
                    error: true,
                    errorIcon: <div/>,
                };

                const driver = render(createCircularProgressBar({...defaultProps, ...errorProps}));
                expect(await driver.isErrorIconDisplayed()).toBe(true);
            });


            //isErrorIconDisplayed false???
            it('should show percentage when error label and icon are not provided', async () => {
                const errorProps = {
                    error: true,
                    errorIcon: null,
                };

                const driver = render(createCircularProgressBar({...defaultProps, ...errorProps}));
                expect(await driver.isErrorIconDisplayed()).toBe(false);
                expect(await driver.getValue()).toBe('40%');
            });


            it('should show errorLabel when error icon is not provided', async () => {
                const errorProps = {
                    error: true,
                    errorLabel: 'Failed',
                    errorIcon: null,
                };

                const driver = render(createCircularProgressBar({...defaultProps, ...errorProps}));
                expect(await driver.isErrorIconDisplayed()).toBe(false);
                expect(await driver.getValue()).toBe('Failed');
            });


        })
    }
});
