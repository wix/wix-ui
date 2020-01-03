declare namespace __WSR {
  namespace Carousel {
    export interface CarouselProps {
      dataHook?: string;
      className?: string;
      images?: string[];
      buttonSkin?: CarouselButtonSkin;
      infinite?: boolean;
      autoplay?: boolean;
      dots?: boolean;
      variableWidth?: boolean;
      initialSlideIndex?: number;
      afterChange?: (currentSlide: number) => void;
      beforeChange?: (currentSlide: number, nextSlide: number) => void;
    }

    export class Carousel extends React.Component<CarouselProps> {}

    export type CarouselButtonSkin = "standard" | "inverted";
  }
}

declare module "wix-style-react" {
  export import Carousel = __WSR.Carousel.Carousel;
  export import CarouselProps = __WSR.Carousel.CarouselProps;
}

declare module "wix-style-react/Carousel" {
  export interface CarouselProps extends __WSR.Carousel.CarouselProps {}
  export default __WSR.Carousel.Carousel;
}
