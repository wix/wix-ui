import type Fuse from 'fuse.js';
import { IconMetadata } from "../src/types";
import * as React from 'react'

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
  iconsMetadata: Array<IconMetadata>;
};

export type IconProps = React.SVGAttributes<SVGElement> & {
  size?: string | number;
};

export type IconDescriptor = {
  size: string;
  name: string;
  Icon: React.FC<IconProps>;
};

// Search index of icons metadata
export type IconsMetadataIndex = Fuse<IconMetadata>;

export type GeneralCategoryListProps = {
  iconComponents: Record<string, React.FC<IconProps>>;
  iconsMetadata: Array<IconMetadata>
  smallSize?: 20 | 18 ;
}
