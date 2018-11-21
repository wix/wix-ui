export interface Driver {
  file: string;
  descriptor: Descriptor[];
}

export interface Descriptor {
  name: string;
  type: string;
}
