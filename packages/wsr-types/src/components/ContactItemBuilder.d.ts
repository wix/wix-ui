declare namespace __WSR {
  namespace ContactItemBuilder {

    export type ContactItemBuilderFn = (data: {
      id: string | number,
      title: string,
      subtitle?: string,
      imageUrl?: string,
      disabled?: boolean,
    }) => {
      id: string | number,
      disabled: boolean | undefined,
      value:  (data: Partial<{ selected: boolean }>) => React.ReactNode
    };

    export const contactItemBuilder: ContactItemBuilderFn;
  }
}

declare module "wix-style-react" {
  export import contactItemBuilder = __WSR.ContactItemBuilder.contactItemBuilder;
}

declare module "wix-style-react/ContactItemBuilder" {
  export import contactItemBuilder = __WSR.ContactItemBuilder.contactItemBuilder;
}
