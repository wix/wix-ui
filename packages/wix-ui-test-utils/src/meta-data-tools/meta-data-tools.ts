/* tslint:disable:no-invalid-this */
import {MetaDataToolsDefinition, MetaDataDefinition, Simulation} from './types';

export class MetaData implements MetaDataDefinition {
  simulations: [Simulation] = [{}]; // Initialize with "empty" simulation

  addSim (sim: Simulation) {
    this.simulations.push(sim);
  }
}

const MetaDataTools: MetaDataToolsDefinition = {
  metaData: new Map(),
  describe (comp) {
    if (!this.metaData.has(comp)) {
      this.metaData.set(comp, new MetaData());
    }

    return this.metaData.get(comp)!;
  },
  clean () {
    this.metaData = new Map();
  }
};

export default MetaDataTools;
