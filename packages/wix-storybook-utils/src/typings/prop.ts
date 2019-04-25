// TODO: not yet full definition
export interface Prop {
  type: {
    name: string;
    value: [];
  };
  required: boolean;
  description: string;
  tags?: Tag[];
}

interface Tag {
  title?: string;
  description?: string;
}
