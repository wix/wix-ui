import * as React from 'react';
import {Simulate} from 'react-dom/test-utils';
import {DatePickerDriver} from './DatePicker.driver';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {DatePicker} from './DatePicker';
import style from './DatePicker.st.css';
import {StylableDOMUtil} from 'stylable/test-utils';
import {Day} from './Day';

describe('Date Picker Component', () => {
    const stylableDOMUtil = new StylableDOMUtil(style);
    const container = new ReactDOMTestContainer().unmountAfterEachTest();

    const render = async (jsx) => {
        await container.render(jsx) 
        return new DatePickerDriver(container.componentNode)
    };

    it('exists', async () => {
        const datePicker = await render(<DatePicker />);
        expect(datePicker.elementExists).toBe(true);
    });

    it('displays label with current date as default', async () => {
        const datePicker = await render(<DatePicker/>);
        expect(datePicker.displayDate).toBe(new Date().toLocaleDateString());
    });

    it('displays 30 days', async () => {
        const datePicker = await render(<DatePicker/>);
        const expectedDaysAmount = 30;
        const days = datePicker.getDomDays();
        expect(days.length).toBe(expectedDaysAmount);
        
        for(let [i, d] of days.entries()) {
            const day = datePicker.getDay(i);
            // check's the days were actually displayed correctle (with label)
            // (index starts with 0, whether the days calendar starts from 1)
            expect(day.elementLabel).toBe(String(i + 1));
        }
    });

    it('displays one of the days as current', async () => {
        const datePicker = await render(<DatePicker/>);
        const currentDay = new Date().getDate();
        // (index starts with 0, whether the days calendar starts from 1)
        const day = datePicker.getDay(currentDay -1);
        expect(day.isCurrent).toBe(true);
    });

    it('displays one of the days as selected ', async () => {
        const selectedDay = 12;
        const datePicker = await render(<DatePicker selectedDay={String(selectedDay)}/>);
        const day = datePicker.getDay(selectedDay -1);
        expect(day.isSelected).toBe(true);
    });

    it('displays a change in selected day selection', async () => {
        const previousSelectedDay = 12;
        const onChange = jest.fn();
        const datePicker = await render(<DatePicker selectedDay={String(previousSelectedDay)} onChange={onChange} />);
        Simulate.click(datePicker.getDay(25).rootElement)

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({value: 26}));
        // expect(datePicker.getDay(25).isSelected).toBe(true)
    });
})