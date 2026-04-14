#!/usr/bin/env bash

# Resolve repo directory
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Source the shared HS helper for access to validation functions
source "$REPO_DIR/.mise/tasks/_hs"

# Wrapper to run butthair tasks through mise
butthair() {
  cd "$REPO_DIR" && mise run -q "$@"
}
export -f butthair
