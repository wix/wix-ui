declare namespace __WSR {
  namespace BadgeSelectItemBuilder {
    export type BadgeSelectItemBuilderFn = (data: {
      id: string | number;
      text: React.ReactNode;
      skin: BadgeSelectItemSkin;
    }) => {
      id: string | number;
      value: React.ReactNode;
    };

    export type BadgeSelectItemSkin =
      | 'general'
      | 'secondaryText'
      | 'danger'
      | 'standard'
      | 'backgroundSecondary'
      | 'primaryLightText'
      | 'success'
      | 'warning'
      | 'urgent'
      | 'neutral'
      | 'neutralStandard'
      | 'mainMutedHover'
      | 'neutralSuccess'
      | 'successMutedHover'
      | 'neutralDanger'
      | 'dangerMutedHover'
      | 'neutralLight'
      | 'warningLight'
      | 'premium';

    export const BadgeSelectItemBuilder: BadgeSelectItemBuilderFn;
  }
}

declare module 'wix-style-react' {
  export import badgeSelectItemBuilder = __WSR.BadgeSelectItemBuilder.BadgeSelectItemBuilder;
}

declare module 'wix-style-react/BadgeSelectItemBuilder' {
  export import badgeSelectItemBuilder = __WSR.BadgeSelectItemBuilder.BadgeSelectItemBuilder;
}
