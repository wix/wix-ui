export interface Driver {
  file: string;
  descriptor?: Descriptor[];
  error?: string;
}

export interface Descriptor {
  name: string;
  type: string;
}
