import { Prop } from './prop';
import { Driver } from './driver';

// TODO: not yet full definition
export interface Metadata {
  displayName: string;
  props: {
    [s: string]: Prop;
  };
  methods?: Method[];
  description?: string;
  readme?: string;
  readmeApi?: string;
  readmeTestkit?: string;
  readmeAccessibility?: string;
  drivers?: Driver[];
}

interface Method {
  name?: string;
  docblock?: null | string;
  modifiers?: string[];
  params?: {
    name?: 'string';
    optional?: boolean;
    type?: null | string;
  }[];
  returns?: null | string;
}
