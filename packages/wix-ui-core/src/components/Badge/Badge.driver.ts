export const badgeDriverFactory = ({element, eventTrigger}) => {
  const getBadgeStyle = () => window.getComputedStyle(element);

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns elements type attribute */
    getType: () => element.getAttribute('type'),
    /** returns elements innerHtml */
    getContent: () => element.innerHTML,
    /** styles element for css properties */
    styles: {
      /** returns elements height css property */
      getHeight: () => getBadgeStyle().height,
      /** returns elements padding css property */
      getPadding: () => getBadgeStyle().padding,
      /** returns elements color css property */
      getColor: () => getBadgeStyle().color,
      /** returns elements opacity css property */
      getOpacity: () => getBadgeStyle().opacity,
      /** returns elements border-radius css property */
      getBorderRadius: () => getBadgeStyle().borderRadius,
      /** returns elements font-size css property */
      getFontSize: () => getBadgeStyle().fontSize,
      /** returns elements line-height css property */
      getLineHeight: () => getBadgeStyle().lineHeight,
      /** returns elements text-decoration css property */
      getTextDecoration: () => getBadgeStyle().textDecoration,
      /** returns elements cursor css property */
      getCursor: () => getBadgeStyle().cursor,
    }
  };
};
