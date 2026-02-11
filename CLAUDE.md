# butthair

CLI wrapper for Hammerspoon's Lua API. Exposes macOS desktop automation as simple shell commands.

## Architecture

Bash tasks in `.mise/tasks/` that call the Hammerspoon CLI (`hs -c "lua expression"`). No custom Hammerspoon config required — uses the standard HS API directly.

- **Shell integration:** `eval "$(mise -C /path/to/butthair run shell)"` adds the `butthair` alias
- **Tasks source `_hs`** for shared HS CLI path, prerequisite checks, and `hs_run` helper
- **Output:** plain text by default, `--json` where applicable

## Task namespaces

- `status` — check Hammerspoon installation and health
- `screenshot` — capture screen
- `windows:*` — list, focus, move, resize windows
- `notify` — system notifications
- `app:*` — launch, focus, kill, list applications
- `screens:*` — list screens and info
- `clipboard:*` — get/set clipboard
- `mouse:*` — position, click, move
- `keyboard:*` — type, press keys

## Patterns

```bash
# All tasks source the shared helper
TASKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$TASKS_DIR/_hs"
hs_check

# Call Hammerspoon
hs_run "return hs.screen.mainScreen():name()"
```

## Shimmer

This project uses [shimmer](https://github.com/ricon-family/shimmer) for agent workflows.

Key commands:
- `shimmer welcome` - Check your identity and system health
- `shimmer tasks` - See all available commands
