import { Dependency } from "./Dependency";

export type Analysis = {
  projectName: string;
  projectVersion: string;
  dependencies: Dependency[];
  devDependencies: Dependency[];
}
