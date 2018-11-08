// TODO: not yet full definition
type Metadata = {
  displayName: string;
  props: {
    [s: string]: Prop;
  };
  readme: string;
  readmeTestkit: string;
  readmeAccessibility: string;
  //not sure if actually optional
  drivers?: Driver[]
};
