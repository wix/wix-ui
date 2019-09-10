export interface Descriptor {
  type: string;
  name?: string;
  props?: Descriptor[];
  [key: string]: any;
}
