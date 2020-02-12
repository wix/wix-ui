declare namespace __WSR {
  namespace DragDropContextProvider {
    export interface DragDropContextProviderProps {
      backend?: Function;
    }

    export class DragDropContextProvider extends React.Component<DragDropContextProviderProps> {}
  }
}

declare module "wix-style-react" {
  export import DragDropContextProvider = __WSR.DragDropContextProvider.DragDropContextProvider;
  export import DragDropContextProviderProps = __WSR.DragDropContextProvider.DragDropContextProviderProps;
}

declare module "wix-style-react/DragDropContextProvider" {
  export interface DragDropContextProviderProps extends __WSR.DragDropContextProvider.DragDropContextProviderProps {}
  export default __WSR.DragDropContextProvider.DragDropContextProvider;
}
