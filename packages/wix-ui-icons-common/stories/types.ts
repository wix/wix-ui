export type Icon = {
  title: string;
  category: string | undefined;
  description: string | undefined;
  tags: Array<string>;
  sizes: Record<string, string>;
};

/** [icon component, icon name, small icon component,
 * small icon name, description] */
export type GeneralTableRow = [
  React.ReactNode,
  string | undefined,
  React.ReactNode,
  string | undefined,
  string | undefined
];
/** [icon name, icon sizes, description] */
export type SystemTableRow = [string, React.ReactNode, string];
export type CategoryTableRow = GeneralTableRow | SystemTableRow;

export type Category = {
  title: string;
  columns: Array<string>;
  rows: Array<CategoryTableRow>;
};

export type IconProps = React.SVGAttributes<SVGElement> & {
  size?: string;
};

export type IconDescriptor = {
  size: string;
  name: string;
  Icon: React.FC<IconProps>;
};
