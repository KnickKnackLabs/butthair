#!/usr/bin/env bats
# Integration tests — require Hammerspoon running with IPC

setup() {
  load test_helper

  # Skip all if Hammerspoon isn't running with IPC
  if ! pgrep -x "Hammerspoon" > /dev/null 2>&1; then
    skip "Hammerspoon not running"
  fi
  if ! "$HS_CLI" -c "return [[ok]]" > /dev/null 2>&1; then
    skip "Hammerspoon IPC not responding"
  fi
}

@test "status runs successfully" {
  run butthair status
  [ "$status" -eq 0 ]
  [[ "$output" == *"butthair status"* ]]
}

@test "status shows installation" {
  run butthair status
  [ "$status" -eq 0 ]
  [[ "$output" == *"Installed:"* ]]
}

@test "status shows permissions section" {
  run butthair status
  [ "$status" -eq 0 ]
  [[ "$output" == *"Permissions"* ]]
  [[ "$output" == *"Accessibility:"* ]]
  [[ "$output" == *"Notifications:"* ]]
}

@test "status shows screen info" {
  run butthair status
  [ "$status" -eq 0 ]
  [[ "$output" == *"Screens:"* ]]
}

@test "status shows window count" {
  run butthair status
  [ "$status" -eq 0 ]
  [[ "$output" == *"Windows:"* ]]
}
