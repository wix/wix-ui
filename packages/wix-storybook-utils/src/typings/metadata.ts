import { Prop } from './prop';
import { Driver } from './driver';

// TODO: not yet full definition
export interface Metadata {
  displayName: string;
  props: {
    [s: string]: Prop;
  };
  readme?: string;
  readmeApi?: string;
  readmeTestkit?: string;
  readmeAccessibility?: string;
  drivers?: Driver[];
}
