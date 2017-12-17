import {sheetMapper} from '../../src/domStyleRenderer';
import * as css from 'css';

export class DomTestkit {
  private componentId: string;
  constructor({componentId}) {
    this.componentId = componentId;
  }

  private getParsedCss(styleElement) {
    const styleElementContent = styleElement.innerHTML;
    return css.parse(styleElementContent);
  }

  getStyleElementByComponentId(componentId) {
    if (!sheetMapper[componentId]) {
      throw 'DomStyleRenderer(getStyleElementByComponentId): componentId doesn\'t exists';
    }
    return sheetMapper[componentId].styleElement;
  }

  getCssValue({className, property}): string {
    const selector = `.${className}`;
    const styleElemet = this.getStyleElementByComponentId(this.componentId);
    const parsedCss = this.getParsedCss(styleElemet);

    const rule = parsedCss.stylesheet.rules.find(ruleItem =>
      ruleItem.selectors.indexOf(selector) !== -1
    );

    const declarationFound = rule.declarations.find(declarationItem => property === declarationItem.property);

    return declarationFound.value;
  }
}
