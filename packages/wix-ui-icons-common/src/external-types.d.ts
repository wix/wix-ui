declare module "*.st.css" {
  const stylesheet: import("@stylable/runtime").RuntimeStylesheet;
  export = stylesheet;
}
declare module "*.scss";
declare module "*.json";
