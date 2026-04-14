<div align="center">

# butthair

**Desktop automation for macOS via Hammerspoon.**

Shell commands for windows, spaces, screenshots, keyboards, and notifications.
No Lua required — just bash tasks that talk to the Hammerspoon API.

![shell: bash](https://img.shields.io/badge/shell-bash-4EAA25?style=flat&logo=gnubash&logoColor=white)
[![runtime: mise](https://img.shields.io/badge/runtime-mise-7c3aed?style=flat)](https://mise.jdx.dev)
![tasks: 21](https://img.shields.io/badge/tasks-21-blue?style=flat)
![tests: 20](https://img.shields.io/badge/tests-20-green?style=flat)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat)](LICENSE)

</div>

## How it works

Every command is a mise task that calls Hammerspoon's `hs` CLI with a Lua expression. The `_hs` helper handles CLI discovery, process checks, input validation, and IPC health — tasks stay thin.

```bash
# Move a window to the left half of the screen
butthair windows:move "Arc" --x 0 --y 0 --w 960 --h 1080

# Switch to space 3
butthair spaces:goto 3

# Take a screenshot
butthair screenshot

# Check everything's healthy
butthair status
```

## Install

```bash
shiv install butthair
```

Requires [Hammerspoon](https://www.hammerspoon.org/) — install it with `butthair install` or download from the website.

## Tasks

| Task             | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| `notify`         | Send a system notification                                             |
| `screenshot`     | Capture a screenshot                                                   |
| `install`        | Install or upgrade Hammerspoon                                         |
| `shell`          | Output shell configuration for global butthair command (use with eval) |
| `setup`          | Initial Hammerspoon setup for butthair                                 |
| `spaces:remove`  | Remove a space by index number                                         |
| `spaces:goto`    | Switch to a space by index number                                      |
| `spaces:add`     | Add a new space                                                        |
| `spaces:current` | Show the current space index and ID                                    |
| `spaces:list`    | List all spaces with IDs and types                                     |
| `status`         | Check Hammerspoon installation and status                              |
| `restart`        | Restart Hammerspoon and wait for IPC                                   |
| `uninstall`      | Uninstall Hammerspoon                                                  |
| `logs`           | Show Hammerspoon console logs                                          |
| `screen:info`    | Show screen dimensions and info                                        |
| `windows:move`   | Move/resize a window by app name                                       |
| `windows:close`  | Close a window by ID                                                   |
| `windows:launch` | Launch an app and optionally position its window                       |
| `windows:list`   | List all windows                                                       |
| `keyboard:press` | Press a key combination                                                |
| `keyboard:type`  | Type a string of text                                                  |

## Development

```bash
gh repo clone KnickKnackLabs/butthair
cd butthair && mise trust && mise install
mise run test   # 20 tests
```

<div align="center">

## License

MIT

This README was created using [readme](https://github.com/KnickKnackLabs/readme).

</div>
