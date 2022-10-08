import { InstallBase, MernshellConfig } from "../../../types";
import { Runner } from "../../cmd";

export class SharedInstaller {
  private _devCommand = ` -D ` as const;
  private npmSkipInstall = " --package-lock-only " as const;
  private npmDryRun = " --dry-run " as const;
  private baseInstallVerb = " install " as const;
  private pnpmSkipInstall = " --shrinkwrap-only " as const;
  constructor(protected runner: Runner = new Runner()) {}

  public async execute(arg: InstallBase, config: MernshellConfig) {
    // this.logScope(arg.scope);
    const command = this.npmCommand(arg, config);

    return this.runner.execute(command);
  }

  private getPrefix(prefix: string, config: MernshellConfig) {
    if (config.dryRun) {
      return "";
    }
    if (config.packageManager === "npm") {
      return ` --prefix ${prefix} `;
    }
    return ` -C ${prefix}`;
  }

  private getPackages(packages: string[]) {
    return ` ${packages.join(" ")} `;
  }

  private dryRun() {
    return this.npmDryRun;
  }

  private skipInstall(config: MernshellConfig) {
    if (config.packageManager === "npm") {
      return this.npmSkipInstall;
    }
    return this.pnpmSkipInstall;
  }

  private get devCommand() {
    return this._devCommand;
  }

  private logScope(scope: string = "") {
    if (scope) {
      console.log(`About to start installing ${scope} dependencies`);
    }
  }

  private npmCommand(arg: InstallBase, config: MernshellConfig) {
    const { prefix, packages, isDev } = arg;
    let command = config.packageManager + this.baseInstallVerb;

    if (prefix) {
      command += this.getPrefix(prefix, config);
    }

    if (this.getPackages.length) {
      command += this.getPackages(packages);
    }

    if (isDev) {
      command += this.devCommand;
    }

    if (config.dryRun || config.skipInstall) {
      command += this.dryRunOrSkipIstall(config);
    }
    return command;
  }

  private dryRunOrSkipIstall(config: MernshellConfig) {
    if (config.dryRun) {
      return this.dryRun();
    }

    return this.skipInstall(config);
  }
}
