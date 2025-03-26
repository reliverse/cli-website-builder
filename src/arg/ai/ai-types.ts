import type { ReliverseConfig } from "~/libs/cfg/constants/cfg-types.js";
import type { ReliverseMemory } from "~/utils/schemaMemory.js";

import type { AGENT_NAMES, CIRCULAR_TRIGGERS } from "./ai-const.js";

export type CircularTrigger = (typeof CIRCULAR_TRIGGERS)[number];

export type Agent = (typeof AGENT_NAMES)[number];

export type AIAgentOptions = {
  config: ReliverseConfig;
  agent: Agent;
  isKeyEnsured: boolean;
  memory?: ReliverseMemory;
  target?: string;
};
