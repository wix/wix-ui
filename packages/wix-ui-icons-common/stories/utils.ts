import { IconMetadata } from '../src/types'

// Returns a list of unique size keys
export const getIconSizeKeys = (iconsMetadata: Array<IconMetadata>) => {
  const iconSizeKeys = new Set<string>();
  for (const icon of iconsMetadata) {
    const { sizes } = icon;
    for (const size in sizes) {
      iconSizeKeys.add(`sizes.${size}`);
    }
  }

  return Array.from(iconSizeKeys);
};
