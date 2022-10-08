#!/usr/bin/env node
import { createTemplateFolder } from "create-template-folder";
import { mernshellConfig } from "./config";
import { FolderOps } from "./core/cmd";
import { install } from "./core/install/install";
import { logger } from "./core/logger";
import { helpText } from "./utils/cli";
import { init } from "./utils/init";

async function main() {
  // init()o;

  init();
  if (mernshellConfig.displayHelp) {
    if (mernshellConfig.devMode) {
      return logger.greenAndRest({ inGreen: "HELP", rest: "asked by user" });
    } else {
      return logger.log(helpText);
    }
  }

  await mernshellConfig.init();
  // mernshellConfig.debug();
  if (mernshellConfig.isOutOfSync) {
    return logger.error(
      `Packages are out of sync. Please run command again with @latest in front of the package`
    ); // TODO: ADD SOME LOGGING MESSAGE HERE
  }

  if (mernshellConfig.devMode) {
    mernshellConfig.debug();
  }

  const newInDirPath = FolderOps.inDirectory();
  const outDirPath = FolderOps.outDirectory(mernshellConfig.name);
  // return;
  const vars = { name: mernshellConfig.name };

  const templatedFiles = await createTemplateFolder(
    {
      inDir: newInDirPath,
      outDir: outDirPath,
      vars,
    },
    {
      dryRun: mernshellConfig.dryRun,
    }
  );
  await install(outDirPath, templatedFiles);
}

main();
