// TODO: not yet full definition
export interface Prop {
  type: PropType;
  required?: boolean;
  description?: string;
  tags?: Tag[];
}

interface Tag {
  title?: string;
  description?: string;
}

export interface PropType {
  name?: string;
  value?: {
    value?: string;
    computed?: boolean;
  }[];
}
