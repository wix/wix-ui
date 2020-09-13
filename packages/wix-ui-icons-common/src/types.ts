export type IconMetadata = {
  title: string;
  category: string | undefined;
  description: string | undefined;
  tags: Array<string>;
  sizes: Record<string, string>;
  aliases?: Array<string>;
};
