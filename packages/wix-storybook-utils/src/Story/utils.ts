const scrollToElement = (element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    });
  }
  
export const scrollToElementByHash = () => {
    const url = new URL(window.parent.location as any);
    if (!url.hash) {
      return;
    }
  
    setTimeout(() => {
      const element = document.getElementById(url.hash.substring(1));
  
      if (!element) {
        return;
      }
    
      scrollToElement(element);
    }, 300);
  }