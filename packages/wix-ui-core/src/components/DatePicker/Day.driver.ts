import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Day.st.css';
import {queryHook} from 'wix-ui-test-utils/dom';

const stylableDOMUtil = new StylableDOMUtil(style);

export class DayDriver { 
  constructor(public root: HTMLElement) { }

  get rootElement(): HTMLElement{
    return this.root
  }; 

  get elementExists(): boolean{
    return !!this.root
  };

  get elementLabel(): React.ReactNode{
    return this.root.textContent;
  }

  get isCurrent(): boolean{
    return stylableDOMUtil.hasStyleState(this.root, 'isCurrent');
  }

  get isHovered(): boolean{
    return stylableDOMUtil.hasStyleState(this.root, 'isHovered');
  }

  get isSelected(): boolean{
    return stylableDOMUtil.hasStyleState(this.root, 'isSelected');
  }
};
