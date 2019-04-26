// TODO: not yet full definition
export interface Prop {
  type: {
    name?: string;
    value?: {
      value?: string;
      computed?: boolean;
    }[];
  };
  required?: boolean;
  description?: string;
  tags?: Tag[];
  defaultValue?: {
    value?: string;
    computed?: boolean;
  };
}

interface Tag {
  title?: string;
  description?: string;
}
