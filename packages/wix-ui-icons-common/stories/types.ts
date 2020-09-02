export type Icon = {
  title: string;
  category: string | undefined;
  description: string | undefined;
  tags: Array<string>;
  sizes: Record<string, string>;
};

export type CategoryIcon = Omit<Icon, "category">;

// [categoryName, icons]
export type Category = [string, Array<CategoryIcon>];

export type IconProps = React.SVGAttributes<SVGElement> & {
  size?: string;
};

export type CategoryTableProps = {
  categoryName: string;
  icons: Array<CategoryIcon>;
};
