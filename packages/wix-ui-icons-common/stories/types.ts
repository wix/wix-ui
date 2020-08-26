type IconSizeMap = {
  "18"?: string;
  "24"?: string;
};

export type Icon = {
  title: string;
  category: string;
  description: string;
  tags: Array<string>;
  system: boolean;
  sizes: IconSizeMap;
};

export type CategoryIcon = Omit<Icon, "category">;

// [categoryName, icons]
export type Category = [string, Array<CategoryIcon>];
