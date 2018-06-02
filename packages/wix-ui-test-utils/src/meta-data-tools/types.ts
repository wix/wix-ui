import * as React from 'react';

export interface MetaDataToolsDefinition {
  metaData: Map<typeof React.Component | React.StatelessComponent<any>, MetaDataDefinition>;
  describe: (comp: typeof React.Component | React.StatelessComponent<any>) => MetaDataDefinition;
  clean: () => void;
}

export interface MetaDataDefinition {
  simulations: [Simulation];
  addSim: (sim: Simulation) => void;
}

export interface Simulation {
  props?: Object;
}
