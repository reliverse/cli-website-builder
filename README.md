# @reliverse/cli | Reliverse CLI | [reliverse.org](https://reliverse.org)

[💖 GitHub Sponsors](https://github.com/sponsors/blefnk) • [💬 Discord](https://discord.gg/Pb8uKbwpsJ) • [✨ Repo](https://github.com/reliverse/cli) • [📦 NPM](https://npmjs.com/@reliverse/cli) • [📚 Docs](https://blefnk.reliverse.org/blog/my-products/reliverse-cli)

**@reliverse/cli** is your all-in-one companion for building and improving web projects — whether you're kicking off something new or upgrading an existing app. It's like having a little AI-powered toolbox in your terminal, ready to help with coding, refactoring, image gen, and more.

## What it can do

- 🦾 It's a superapp for devs. One CLI. Tons of stuff. Spin up, refactor, deploy, AI — it's all in there.
- 🚀 Start fresh or load up an existing template in seconds.
- 🔧 Refactor safely, drop in popular libs, and keep your codebase happy.
- ⚙️ Automate boring setup stuff like ESLint, env files, etc — let the CLI handle it.
- 🏗️ Works great with Next.js and plays nice with other frameworks too.
- 🌐 Push to GitHub, deploy to Vercel — all in one go.
- ⏬ Reliverse auto-clones repos/templates and configures them smartly.
- 🔌 Use the `🔬 Create/edit project manually` (or `reliverse init`) to integrate things into your codebase.
- 🤖 Chat with Reliverse AI or let agentic tools like Relinter suggest improvements to your code.

## Getting Started

Ensure Git, Node.js, and bun•pnpm•yarn•npm are installed. Then:

### Installation

1. **Install globally**:

   ```sh
   bun i -g @reliverse/cli
   ```

   **Or update as needed**:

   ```sh
   reliverse update
   ```

2. **Run and enjoy**:

   ```sh
   reliverse cli
   ```

  `.reliverse/reliverse.config.{ts,jsonc}` is generated on first run.
  Customize it to fit your project and tweak CLI behavior.
  Changes apply next launch (hot-reload coming soon).

## Show some love 🫶

If `@reliverse/cli` saved you time or made you smile:

- Support on [GitHub Sponsors](https://github.com/sponsors/blefnk)
- Or just drop a ⭐️ on [GitHub](https://github.com/reliverse/cli)

It helps more than you think! Thanks for being here!

## Commands

From bootstrapping projects to unleashing AI superpowers. Below is a quick overview of what the Reliverse CLI can do.

### Notes

- All commands and flags are optional. Reliverse tries its best to guide you, even if you skip arguments.
- `reliverse cli` is your all-in-one entry point — it includes everything available in the individual commands.
- Prefer quick access or running in non-interactive environments like CI/CD? Use the specific commands directly.  
- Run `reliverse <command> --help` to explore available options and flags.

### Core Commands

- `reliverse cli` — Here you can launch an interactive wizard to create or boost your project.
- `reliverse logout` — Logs you out and clears credentials. For when it's time to start fresh.
- `reliverse studio` — Opens the Reliverse Studio — the visual brain center of your local Reliverse memory.
- `reliverse --help` — Shows all available commands and handy usage tips. Because we all forget sometimes.

### AI Commands ([docs](./src/cli/docs/docs-ai.md))

- `reliverse ai <prompt>` — Your terminal-sidekick. Ask questions, get help, or just have a quick chat with Reliverse AI.  
- `reliverse ai code <prompt> <paths>` — Need a refactor or something new? Let AI generate or improve code across the given paths.  
- `reliverse ai gen <prompt>` — Describe an image and the AI will create it for you, saving it directly to your selected upload provider.  
- `reliverse ai lint <prompt> <paths>` — Run smart linting on your code using AI. It catches issues, suggests fixes, and helps clean things up fast.

### Init/Add Commands ([docs](./src/cli/docs/docs-add.md))

- `reliverse init` — Kickstart a new minimal Reliverse project. Building a library or an app? Just pick your direction and you're good to go — clean start, full power.
- `reliverse add` _(without args)_ — Same as `reliverse init`. Both open an interactive wizard — with different prompts depending on whether the folder is empty or not.
- `reliverse add <something>` — Drop in the essentials or the extras — from API, auth, DB, payments, and i18n — to AI tools, file uploaders, and form libraries — all integrated into your codebase in seconds. Feels like magic. Actually is.
- `reliverse add -g <something>` — Use `-g` to install global CLIs (e.g. `eslint`, `@reliverse/relidler`), essential tools (e.g. `bun`, `stripe`), or even desktop apps (e.g. `code`, `obsidian`) — all from your terminal.
- `reliverse add rule <something>` — Browse and install AI IDE rules for Reliverse, Cursor, Windsurf, Copilot, and more — from both official and community sources. Powered by smart caching and auto-conversion to `.mdc` when needed.

### Additional

- `reliverse clone` ([docs](./src/cli/docs/docs-clone.md)) — Clone a GitHub repo (just paste the link), or convert a webpage into LLM-ready content if you pass a non-GitHub URL.
- `reliverse cmod` ([docs](./src/cli/docs/docs-cmod.md)) — Applies codemods to your project — for quick, safe refactoring powered by AI or presets.
- `reliverse env` ([docs](./src/cli/docs/docs-env.md)) — Instantly generates a .env file based on your .env.example with an interactive wizard. Saves time, avoids typos.
- `reliverse multireli` ([docs](./src/cli/docs/docs-multireli.md)) — Generates multiple reliverse config files so you can batch-generate multiple projects with reliverse cli.
- `reliverse upload` ([docs](./src/cli/docs/docs-upload.md)) — Uploads a media files like images to your selected provider like UploadThing and Uploadcare.
- `reliverse sync` _(coming soon)_ — Syncs your local @reliverse/cli memory with your own Reliverse AI which lies on [reliverse.org](https://reliverse.org).

## API (for advanced users)

- The SDK lets you build custom Reliverse CLI plugins, interact with [reliverse.org](https://reliverse.org), or even power up your own CLIs.
- No need to reinvent the wheel — [@blefnk](https://github.com/blefnk) already took care of the hard parts, so you can use it however you like.
- If it saves you time, please [consider making a small donation](https://github.com/sponsors/blefnk) 🩷 to support ongoing development.

```sh
bun add @reliverse/cli-sdk
```

## Contribute, please 😽

- Everything you see in Reliverse so far is **built by one person** ([@blefnk Nazar Kornienko](https://github.com/blefnk)) — with love, caffeine, and way too many terminal tabs.
- Got feedback, ideas, bugs to squash, or just wanna vibe with the project? [Hop into my Discord](https://discord.gg/Pb8uKbwpsJ) — I'd love to chat.
- Whether you want to code, brainstorm, fix typos, or just hang out — you're always welcome here.  
  No pressure, no gatekeeping — just good energy and open-source fun.

### <🏗️1> Come together, right now

Two ways to clone this repo and contribute:

**Classic way**:

```bash
git clone https://github.com/reliverse/cli.git
cd cli
code . # opens vscode editor
```

**Reliverse way**:

```bash
reliverse cli
> Clone an existing repository
> Developer related  
> reliverse  
> cli
> Y/n # opens default editor
```

Boom. You're in.

### <🏗️2> You're a magician, do magic

1. Run `bun latest` to install dependencies and keep things fresh.
2. Use AI (Reliverse, Cursor, whatever floats your dev boat) or write code manually.
3. Note that `bun dev:command` works just like running `reliverse <command> --dev`.
4. It’s a good idea to run `bun check` to make sure everything's clean and happy.
5. All done? Awesome! Now commit and push your changes by following your way:

**Classic way**:

```bash
git add .
git commit -m "your commit message"
git push
```

**Reliverse way**:

```bash
reliverse cli
> Commit
<your commit message>
<press enter to push>
```

### <🏗️3> What a great time to live

- All done? High five! 🖐️
- Head to [repo](https://github.com/reliverse/cli/pulls) & open a PR.
- That's it. You're amazing.

Thanks for being part of this!

## Shoutout

Reliverse CLI was inspired by this gem:

- [t3-oss/create-t3-app](https://github.com/t3-oss/create-t3-app#readme)

## License

💖 [MIT](./LICENSE) © 2025 [blefnk (Nazar Kornienko)](https://github.com/blefnk)
