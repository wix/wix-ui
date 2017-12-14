import {getStyleElementByComponentId} from './';
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
    const styleElement = getStyleElementByComponentId(this.componentId);
    const parsedCss = this.getParsedCss(styleElement);

    const rule = parsedCss.stylesheet.rules.find(ruleItem =>
      ruleItem.selectors.indexOf(selector) !== -1
    );

    const declarationFound = rule.declarations.find(declarationItem => property === declarationItem.property);

    return declarationFound.value;
  }
}
