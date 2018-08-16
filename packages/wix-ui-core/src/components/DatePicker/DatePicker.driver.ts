import {StylableDOMUtil} from 'stylable/test-utils';
import style from './DatePicker.st.css';
import {DayDriver} from './Day.driver';
// import {queryHook} from 'wix-ui-test-utils/dom';

const stylableDOMUtil = new StylableDOMUtil(style);

export class DatePickerDriver { 
  constructor(public root: HTMLElement) { } 
  getDisplayDate = () => stylableDOMUtil.select('.displayDate', this.root);
  getDomDays = () => stylableDOMUtil.selectAll('.day', this.root)
  getDay = (i: number) :DayDriver => {
    const days = this.getDomDays()
    return new DayDriver(<HTMLElement>days[i])
  }

  get elementExists(): boolean{
    return !!this.root
  };

  get displayDate(): string{
    return this.getDisplayDate().textContent;
  }
};
