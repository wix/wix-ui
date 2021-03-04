import { Metadata } from '../typings/metadata';
import { Prop } from '../typings/prop';

export type AutoDocsProps = {
  metadata: Metadata;
};

export type PropertiesTableProps = {
  props: { [s: string]: Prop };
};
