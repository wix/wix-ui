import { Process } from '../../typings.d';

export interface Options {
  definitions?: string;
  components?: string;
  exportSuffix?: string;
  exportCaseStyle?: string;
  template?: string;
  templatePath?: string;
  output?: string;
  factoryName?: string;
  uniFactoryName?: string;
  _process: Process;
}
