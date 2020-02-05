declare namespace __WSR {
  namespace Accordion {
    export interface AccordionProps {
      dataHook?: string;
      multiple?: boolean;
      items?: AccordionItem[];
      skin?: "light" | "standard";
    }

    export class Accordion extends React.Component<AccordionProps> {}

    export interface AccordionItem {
      title?: React.ReactNode;
      icon?: React.ReactNode;
      content?: React.ReactNode;
      expandLabel?: React.ReactNode;
      collapseLabel?: React.ReactNode;
      buttonType?: AccordionItemButtonType;
      skin?: "light" | "standard";
    }

    export type AccordionItemButtonType = "textButton" | "button";
  }
}

declare module "wix-style-react" {
  export import Accordion = __WSR.Accordion.Accordion;
  export import AccordionProps = __WSR.Accordion.AccordionProps;
}

declare module "wix-style-react/Accordion" {
  export interface AccordionProps extends __WSR.Accordion.AccordionProps {}
  export default __WSR.Accordion.Accordion;
}
