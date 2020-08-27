export type OmitPolyfill<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type IconSizeMap = {
  "18"?: string;
  "24"?: string;
};

export type Icon = {
  title: string;
  category: string;
  description: string;
  tags: Array<string>;
  sizes: IconSizeMap;
};

export type CategoryIcon = OmitPolyfill<Icon, "category">;

// [categoryName, icons]
export type Category = [string, Array<CategoryIcon>];
