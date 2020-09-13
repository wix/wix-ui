export type IconMetadata = {
  title: string;
  category: string | undefined;
  description: string | undefined;
  /** tags to be used for searching icons in storybook */
  tags: Array<string>;
  sizes: Record<string, string>;
  /** some icons have duplicates under different names,
   * lists all files that are described by this metadata */
  aliases?: Array<string>;
};
