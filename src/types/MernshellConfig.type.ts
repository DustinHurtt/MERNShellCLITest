export interface ICLIConfig {
  [arg: string]: string | boolean;
}

export interface BaseConfig {
  // variants
  auth: boolean;
  base: boolean;

  //   templates
  json: boolean;
  views: boolean;
  fs: boolean;

  //   doesn't run anything
  dryRun: boolean;
  //   debugging
  verbose: boolean;
  devMode: boolean;
  variant: MernShellVariant;
  template?: MernShellTemplate;
  displayHelp: boolean;
  name: string;
  isPnpm: boolean;
  packageManager: `npm` | "pnpm";
  skipInstall: boolean;
}

export type MernShellTemplate = "views" | "json" | "fullstack";
export type MernShellVariant = "base" | "authentication";

export interface MernshellConfig extends BaseConfig {
  init(): Promise<void>;
}

export interface MernshellType {
  tech: "views" | "json" | "fs";
  variant: "authentication" | "base";
}
