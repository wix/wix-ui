declare namespace __WSR {
  namespace Search {
    export interface SearchProps
      extends InputWithOptions.InputWithOptionsProps {
      expandable?: boolean;
      expandWidth?: string | number;
      predicate?: (option: DropdownLayout.DropdownLayoutValueOption) => boolean;
      debounceMs?: number;
    }

    export class Search extends React.Component<SearchProps> {}
  }
}

declare module "wix-style-react" {
  export import Search = __WSR.Search.Search;
  export import SearchProps = __WSR.Search.SearchProps;
}

declare module "wix-style-react/Search" {
  export interface SearchProps extends __WSR.Search.SearchProps {}
  export default __WSR.Search.Search;
}
