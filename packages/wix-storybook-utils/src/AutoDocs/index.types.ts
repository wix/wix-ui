import { Metadata } from '../typings/metadata';
import { Prop } from '../typings/prop';

export interface AutoDocsProps {
  metadata: Metadata;
}

export interface PropertiesTableProps {
  props: { [s: string]: Prop };
}
