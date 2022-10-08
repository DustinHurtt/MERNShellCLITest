import { spawn } from "child_process";
import type { CommonSpawnOptions } from "child_process";
import { MernshellConfig } from "../../types";
import { mernshellConfig } from "../../config";

export class Runner {
  constructor(private config: MernshellConfig = mernshellConfig) {}

  private get stdio(): CommonSpawnOptions["stdio"] {
    return this.config.verbose ? "inherit" : "ignore";
  }
  execute(command: string) {
    return new Promise((res, rej) => {
      const childProcess = spawn(command, { stdio: this.stdio, shell: true });

      childProcess.on("close", res);
      childProcess.on("error", rej);
    });
  }
}
