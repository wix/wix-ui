import * as React from 'react';
import {Simulate} from 'react-dom/test-utils';
import {DayDriver} from './Day.driver';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {Day} from './Day';

describe('Day Component', () => {
    const container = new ReactDOMTestContainer().unmountAfterEachTest();

    const render = async (jsx) => {
        await container.render(jsx) 
        return new DayDriver(container.componentNode)
    };
    
    it('exists', async () => {
        const day = await render(<Day value={'gg123456'} label={0}/>);
        
        expect(day.elementExists).toBe(true);
    });

    it('displays a given text(label)', async () => {
        const day = await render (<Day value={'gg123456'} label='15' />);
        
        expect(day.elementLabel).toBe('15');
    });

    it('triggers onClick event when clicked', async () => {
        const onClick = jest.fn();
        const day = await render(<Day value={'gg123456'} label={5} onClick={onClick}/>);
        Simulate.click(day.rootElement);

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({value: 'gg123456'}));
    });

    it('displays if the day is current day', async () => {
        const day = await render (<Day value={'gg123456'} label={5} isCurrent/>);
        
        expect(day.isCurrent).toBe(true);
    });

    it('displays if the day was hovered', async () => {
        const day = await render (<Day value={'gg123456'} label={5} />);
        Simulate.mouseEnter(day.rootElement);

        expect(day.isHovered).toBe(true);
    });

    it('displays if the day is a selected day', async () => {
        const day = await render (<Day value={'gg123456'} label={5} isSelected/>);

        expect(day.isSelected).toBe(true);
    });
})