import type Fuse from 'fuse.js';
import { IconMetadata } from "../src/types";

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
export type SystemTableRow = [string, React.ReactNode, string | undefined];
export type CategoryTableRow = Array<React.ReactNode>;

export type Category = {
  title: string;
  tableHeaderTitles: Array<string>;
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

// Search index of icons metadata
export type IconsMetadataIndex = Fuse<IconMetadata>;
