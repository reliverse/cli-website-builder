import {
  selectPrompt,
  inputPrompt,
  multiselectPrompt,
} from "@reliverse/prompts";
import { relinka } from "@reliverse/relinka";
import pc from "picocolors";

import type { CliResults } from "~/app/menu/create-project/cp-modules/use-composer-mode/opts.js";
import type {
  ProjectArchitecture,
  ProjectCategory,
  ProjectSubcategory,
  ReliverseConfig,
} from "~/utils/schemaConfig.js";
import type { ReliverseMemory } from "~/utils/schemaMemory.js";

import {
  DEFAULT_APP_NAME,
  experimental,
  recommended,
  UNKNOWN_VALUE,
} from "~/app/constants.js";
import {
  randomProjectFrameworkTitle,
  getRandomMessage,
} from "~/app/db/messages.js";
import { showComposerMode } from "~/app/menu/create-project/cp-modules/use-composer-mode/mod.js";
import {
  TEMP_BROWSER_TEMPLATE_OPTIONS,
  TEMP_VSCODE_TEMPLATE_OPTIONS,
  TEMP_FULLSTACK_WEBSITE_TEMPLATE_OPTIONS,
  type TemplateOption,
  TEMP_SEPARATED_WEBSITE_TEMPLATE_OPTIONS,
} from "~/utils/projectTemplate.js";

import { createWebProject } from "./create-project/cp-mod.js";

/**
 * Possible template options for VS Code extensions
 */
export type VSCodeTemplateOption =
  | "microsoft/vscode-extension-samples"
  | "microsoft/vscode-extension-template"
  | "unknown";

/**
 * Possible template options for browser extensions
 */
export type BrowserTemplateOption =
  | "reliverse/template-browser-extension"
  | "unknown";

/**
 * Asks the user for extension config via prompts
 */
export async function configureBrowserExtension() {
  const browserExtensionConfig = {
    displayName: await inputPrompt({
      title: "What's the display name of your extension?",
      defaultValue: "My Extension",
      validate: (value: string): string | boolean => {
        if (!value?.trim()) {
          return "Display name is required";
        }
        return true;
      },
    }),
    description: await inputPrompt({
      title: "Provide a short description of your extension",
      defaultValue: "A VS Code extension",
      validate: (value: string): string | boolean => {
        if (!value?.trim()) {
          return "Description is required";
        }
        return true;
      },
    }),
    features: await multiselectPrompt({
      title: "What kind of features will your extension include?",
      options: [
        {
          label: "Commands",
          value: "commands",
          hint: pc.dim("Add custom commands to VS Code"),
        },
        {
          label: "WebView",
          value: "webview",
          hint: pc.dim("Create custom UI panels"),
        },
        {
          label: "Language Support",
          value: "language",
          hint: pc.dim("Add support for a programming language"),
        },
        {
          label: "Themes",
          value: "themes",
          hint: pc.dim("Create custom color themes"),
        },
      ],
    }),
    activation: await selectPrompt({
      title: "When should your extension activate?",
      options: [
        {
          label: "On Command",
          value: "onCommand",
          hint: pc.dim("Activate when a specific command is run"),
        },
        {
          label: "On Language",
          value: "onLanguage",
          hint: pc.dim("Activate for specific file types"),
        },
        {
          label: "On Startup",
          value: "startup",
          hint: pc.dim("Activate when VS Code starts"),
        },
      ],
    }),
    publisher: await inputPrompt({
      title: "What's your VS Code marketplace publisher ID?",
      content: "Create one at https://marketplace.visualstudio.com/manage",
      validate: (value: string): string | boolean => {
        if (!value?.trim()) {
          return "Publisher ID is required";
        }
        if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/i.test(value)) {
          return "Invalid publisher ID format";
        }
        return true;
      },
    }),
  };

  return browserExtensionConfig;
}

/**
 * Asks the user for extension config via prompts
 */
export async function configureVSCodeExtension() {
  const vscodeExtensionConfig = {
    displayName: await inputPrompt({
      title: "What's the display name of your extension?",
      defaultValue: "My Extension",
      validate: (value: string): string | boolean => {
        if (!value?.trim()) {
          return "Display name is required";
        }
        return true;
      },
    }),
    description: await inputPrompt({
      title: "Provide a short description of your extension",
      defaultValue: "A VS Code extension",
      validate: (value: string): string | boolean => {
        if (!value?.trim()) {
          return "Description is required";
        }
        return true;
      },
    }),
    features: await multiselectPrompt({
      title: "What kind of features will your extension include?",
      options: [
        {
          label: "Commands",
          value: "commands",
          hint: pc.dim("Add custom commands to VS Code"),
        },
        {
          label: "WebView",
          value: "webview",
          hint: pc.dim("Create custom UI panels"),
        },
        {
          label: "Language Support",
          value: "language",
          hint: pc.dim("Add support for a programming language"),
        },
        {
          label: "Themes",
          value: "themes",
          hint: pc.dim("Create custom color themes"),
        },
      ],
    }),
    activation: await selectPrompt({
      title: "When should your extension activate?",
      options: [
        {
          label: "On Command",
          value: "onCommand",
          hint: pc.dim("Activate when a specific command is run"),
        },
        {
          label: "On Language",
          value: "onLanguage",
          hint: pc.dim("Activate for specific file types"),
        },
        {
          label: "On Startup",
          value: "startup",
          hint: pc.dim("Activate when VS Code starts"),
        },
      ],
    }),
    publisher: await inputPrompt({
      title: "What's your VS Code marketplace publisher ID?",
      content: "Create one at https://marketplace.visualstudio.com/manage",
      validate: (value: string): string | boolean => {
        if (!value?.trim()) {
          return "Publisher ID is required";
        }
        if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/i.test(value)) {
          return "Invalid publisher ID format";
        }
        return true;
      },
    }),
  };

  return vscodeExtensionConfig;
}

/**
 * Main entry point to show user a new project menu
 */
export async function showNewProjectMenu(
  cwd: string,
  isDev: boolean,
  memory: ReliverseMemory,
  config: ReliverseConfig,
  reli: ReliverseConfig[],
): Promise<void> {
  const endTitle =
    "📚 Check the docs to learn more: https://docs.reliverse.org";

  const skipPrompts = config?.skipPromptsUseAutoBehavior ?? false;
  console.log("skipPrompts", skipPrompts);
  const isMultiConfig = reli.length > 0;

  if (isMultiConfig) {
    relinka(
      "info",
      "[🚨 Experimental] Continuing with the multi-config mode (currently only web projects are supported)...",
    );
    await optionCreateWebProject(
      cwd,
      isDev,
      memory,
      config,
      endTitle,
      true,
      reli,
      skipPrompts,
    );
  } else {
    let projectCategory = config.projectCategory;
    if (projectCategory === UNKNOWN_VALUE) {
      // Display the menu to let the user pick a project type
      const selectedType = await selectPrompt<ProjectCategory>({
        endTitle,
        title: getRandomMessage("initial"),
        options: [
          {
            label: "Web Application",
            value: "website",
            hint: pc.dim("Create a website with Next.js"),
          },
          {
            label: "VS Code Extension",
            value: "vscode",
            hint: experimental,
          },
          {
            label: "Browser Extension",
            value: "browser",
            hint: experimental,
          },
          {
            label: "CLI Project",
            value: "cli",
            hint: experimental,
          },
          { separator: true },
          {
            label: pc.italic(
              pc.dim("More types of projects and frameworks coming soon 🦾"),
            ),
            value: UNKNOWN_VALUE,
            disabled: true,
          },
        ],
      });
      projectCategory = selectedType;
    }

    if (projectCategory === "vscode") {
      await optionCreateVSCodeExtension(
        cwd,
        isDev,
        memory,
        config,
        endTitle,
        skipPrompts,
      );
    } else if (projectCategory === "browser") {
      await optionCreateBrowserExtension(
        cwd,
        isDev,
        memory,
        config,
        endTitle,
        skipPrompts,
      );
    } else {
      // Default = "web"
      await optionCreateWebProject(
        cwd,
        isDev,
        memory,
        config,
        endTitle,
        false,
        reli,
        skipPrompts,
      );
    }
  }
}

async function optionCreateVSCodeExtension(
  cwd: string,
  isDev: boolean,
  memory: ReliverseMemory,
  config: ReliverseConfig,
  endTitle: string,
  skipPrompts: boolean,
) {
  const template = (await selectPrompt({
    endTitle,
    title: "Which VS Code extension template would you like to use?",
    options: [
      ...Object.values(TEMP_VSCODE_TEMPLATE_OPTIONS),
      { separator: true },
      {
        label: pc.italic(pc.dim("More templates coming soon")),
        value: "unknown",
        disabled: true,
      },
    ],
  })) as VSCodeTemplateOption;

  const vscodeExtensionConfig = await configureVSCodeExtension();

  if (vscodeExtensionConfig) {
    await createWebProject({
      webProjectTemplate: template as Exclude<VSCodeTemplateOption, "unknown">,
      message: getRandomMessage("category"),
      mode: "showNewProjectMenu",
      isDev,
      config,
      memory,
      cwd,
      skipPrompts,
    });
  } else {
    relinka("error", "No VS Code extension config provided");
  }
}

async function optionCreateBrowserExtension(
  cwd: string,
  isDev: boolean,
  memory: ReliverseMemory,
  config: ReliverseConfig,
  endTitle: string,
  skipPrompts: boolean,
) {
  const template = (await selectPrompt({
    endTitle,
    title: "Which browser extension template would you like to use?",
    options: [
      ...Object.values(TEMP_BROWSER_TEMPLATE_OPTIONS),
      { separator: true },
      {
        label: pc.italic(pc.dim("More templates coming soon")),
        value: "unknown",
        disabled: true,
      },
    ],
  })) as BrowserTemplateOption;

  const browserExtensionConfig = await configureBrowserExtension();

  if (browserExtensionConfig) {
    await createWebProject({
      webProjectTemplate: template as Exclude<BrowserTemplateOption, "unknown">,
      message: getRandomMessage("category"),
      mode: "showNewProjectMenu",
      isDev,
      config,
      memory,
      cwd,
      skipPrompts,
    });
  } else {
    relinka("error", "No browser extension config provided");
  }
}

/**
 * Orchestrates the creation of a Web project.
 * If `isMultiConfig` is true, we loop through `reli` array.
 */
async function optionCreateWebProject(
  cwd: string,
  isDev: boolean,
  memory: ReliverseMemory,
  config: ReliverseConfig,
  endTitle: string,
  isMultiConfig: boolean,
  reli: ReliverseConfig[],
  skipPrompts: boolean,
): Promise<void> {
  if (isMultiConfig) {
    for (const multiConfig of reli) {
      let template = multiConfig.projectTemplate;
      if (template === "unknown") {
        let architecture = multiConfig.projectArchitecture;
        if (architecture === "unknown") {
          architecture = await selectPrompt<ProjectArchitecture>({
            endTitle,
            title: "Which architecture would you prefer?",
            options: [
              {
                label: `${pc.bold("Fullstack")} ${recommended}`,
                value: "fullstack",
              },
              {
                label: `${pc.dim("Separated frontend and backend")} ${experimental}`,
                value: "separated",
              },
            ],
          });
        }
        template = (await selectPrompt({
          endTitle,
          title: "Which template would you like to use?",
          options:
            architecture === "fullstack"
              ? Object.values(TEMP_FULLSTACK_WEBSITE_TEMPLATE_OPTIONS)
              : Object.values(TEMP_SEPARATED_WEBSITE_TEMPLATE_OPTIONS),
        })) as TemplateOption;
      }
      await createWebProject({
        webProjectTemplate: template,
        message: "Setting up a brand new web app project...",
        isDev,
        config: multiConfig,
        memory,
        cwd,
        mode: "showNewProjectMenu",
        skipPrompts,
      });
    }
  } else {
    // Single config: prompt for projectFramework if not set
    let projectFramework = config?.projectFramework;
    if (!projectFramework) {
      const result = await selectPrompt({
        endTitle,
        title:
          randomProjectFrameworkTitle[
            Math.floor(Math.random() * randomProjectFrameworkTitle.length)
          ] ?? "What project framework best fits your project?",
        options: [
          {
            label: "Next.js",
            value: "nextjs",
            hint: pc.dim("recommended for most projects"),
          },
          {
            label: "...",
            hint: pc.dim("coming soon"),
            value: "unknown",
            disabled: true,
          },
        ],
      });
      if (result !== "nextjs") {
        relinka("error", "Invalid projectFramework selected");
        return;
      }
      projectFramework = result;
    }

    let shouldContinueWithRecommended = "recommended";
    if (!skipPrompts) {
      // Let user pick "advanced" vs. "simple" (offline) approach
      shouldContinueWithRecommended = await selectPrompt({
        endTitle,
        title: "Should I continue with advanced or simple mode?",
        options: [
          {
            label: pc.bold(pc.greenBright("Advanced")),
            value: "recommended",
            hint: pc.greenBright(pc.reset("✨ STABLE & RECOMMENDED")),
          },
          {
            label: pc.dim(pc.red("Simple")),
            value: "offline",
            hint: pc.red("🚨 experimental, offline"),
          },
        ],
      });
    }

    if (shouldContinueWithRecommended === "offline") {
      const cliResults: CliResults = {
        appName: DEFAULT_APP_NAME,
        packages: [],
        flags: {
          noGit: false,
          noInstall: false,
          default: false,
          importAlias: "",
          framework: true,
          CI: false,
          tailwind: false,
          trpc: false,
          prisma: false,
          drizzle: false,
          nextAuth: false,
          dbProvider: "postgres",
        },
        databaseProvider: "postgres",
      };
      await showComposerMode(cliResults);
      return;
    }

    // Prompt for website subcategory
    let websiteSubcategory = config?.projectSubcategory;
    if (websiteSubcategory === UNKNOWN_VALUE) {
      const selectedSubcategory = await selectPrompt<ProjectSubcategory>({
        endTitle,
        title: getRandomMessage("subcategory"),
        options: [
          { label: "E-commerce", value: "e-commerce" },
          {
            label: "...",
            hint: pc.dim("coming soon"),
            value: UNKNOWN_VALUE,
            disabled: true,
          },
        ],
      });
      websiteSubcategory = selectedSubcategory;
    }

    // If user's config has a template, use it; else ask
    let template: TemplateOption;
    if (config.projectTemplate !== UNKNOWN_VALUE) {
      template = config.projectTemplate as TemplateOption;
    } else {
      let architecture = config.projectArchitecture;
      if (architecture === "unknown") {
        architecture = await selectPrompt<ProjectArchitecture>({
          endTitle,
          title: "Which architecture would you prefer?",
          options: [
            {
              label: `${pc.bold("Fullstack")} ${recommended}`,
              value: "fullstack",
            },
            {
              label: `${pc.dim("Separated frontend and backend")} ${experimental}`,
              value: "separated",
            },
          ],
        });
      }
      const result = await selectPrompt({
        endTitle,
        title: "Which template would you like to use?",
        options:
          architecture === "fullstack"
            ? Object.values(TEMP_FULLSTACK_WEBSITE_TEMPLATE_OPTIONS)
            : Object.values(TEMP_SEPARATED_WEBSITE_TEMPLATE_OPTIONS),
      });
      template = result as TemplateOption;
    }

    // Finally, create the web project
    await createWebProject({
      webProjectTemplate: template,
      message: skipPrompts
        ? "Setting up project..."
        : getRandomMessage("details"),
      mode: "showNewProjectMenu",
      isDev,
      config,
      memory,
      cwd,
      skipPrompts,
    });
  }
}

export function configureCliProject() {
  relinka("info", "Coming soon...");
}
