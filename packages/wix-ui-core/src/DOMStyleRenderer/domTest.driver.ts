import {getStyleElementByComponentId} from './index';
import * as css from 'css';

export class DomTestDriver {
  private componentId: string;
  constructor({componentId}) {
    this.componentId = componentId;
  }

  private getParsedCss(styleElement) {
    const styleElementContent = styleElement.innerHTML;
    return css.parse(styleElementContent);
  }

  getCssValue({className, property}): string {
    const selector = `.${className}`;
    let declarationValue = '';
    const styleElemet = getStyleElementByComponentId(this.componentId);
    const parsedCss = this.getParsedCss(styleElemet);

    const rule = parsedCss.stylesheet.rules.find(ruleItem =>
      ruleItem.selectors.indexOf(selector) !== -1
    );

    const declarationFound = rule.declarations.find(declarationItem => property === declarationItem.property);

    declarationValue = declarationFound.value;

    return declarationValue;
  }
}
