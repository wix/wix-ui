export type IconSizeMap = {
  [key: string]: string;
} & {
  "18"?: string;
  "24"?: string;
};

export type Icon = {
  title: string;
  category: string | undefined;
  description: string | undefined;
  tags: Array<string>;
  sizes: IconSizeMap;
};

export type CategoryIcon = Omit<Icon, "category">;

// [categoryName, icons]
export type Category = [string, Array<CategoryIcon>];

export type IconProps = React.SVGAttributes<SVGElement> & {
  size?: string;
};
