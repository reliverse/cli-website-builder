import { ensuredir } from "@reliverse/fs";
import { defineCommand } from "@reliverse/prompts";
import { validateDevCwd } from "@reliverse/relidler-sdk";
import fs from "fs-extra";

import { authCheck } from "~/arg/login/login-impl.js";
import { cliName, useLocalhost } from "~/libs/cfg/constants/cfg-details.js";
import { getReliverseConfig } from "~/utils/reliverseConfig/rc-mod.js";
import { getReliverseMemory } from "~/utils/reliverseMemory.js";
import { getCurrentWorkingDirectory } from "~/utils/terminalHelpers.js";

import { app } from "./app-impl.js";
import { showStartPrompt } from "./menu/create-project/cp-modules/cli-main-modules/modules/showStartEndPrompt.js";

export default defineCommand({
  meta: {
    name: "cli",
    description: `Runs the ${cliName}`,
  },
  args: {
    dev: {
      type: "boolean",
      description: "Runs the CLI in dev mode",
    },
    cwd: {
      type: "string",
      description: "The working directory to run the CLI in",
      required: false,
    },
  },
  run: async ({ args }) => {
    const isDev = args.dev;
    await showStartPrompt(isDev, false);

    // Ensure --dev flag is used only within a valid reliverse dev envi
    await validateDevCwd(isDev, ["cli", "reliverse"], "reliverse", "reliverse");

    let cwd: string;
    if (args.cwd) {
      cwd = args.cwd;
      if (!(await fs.pathExists(cwd))) {
        await ensuredir(cwd);
      }
    } else {
      cwd = getCurrentWorkingDirectory();
    }

    const memory = await getReliverseMemory();
    const { config, multireli } = await getReliverseConfig(cwd, isDev, {});

    await authCheck(isDev, memory, useLocalhost);
    await app({ cwd, isDev, config, memory, multireli });

    process.exit(0);
  },
});
