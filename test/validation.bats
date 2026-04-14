#!/usr/bin/env bats

setup() {
  load test_helper
}

# ── hs_validate_app ──────────────────────────────────────────

@test "hs_validate_app accepts simple app name" {
  run hs_validate_app "Safari"
  [ "$status" -eq 0 ]
}

@test "hs_validate_app accepts app name with spaces" {
  run hs_validate_app "Google Chrome"
  [ "$status" -eq 0 ]
}

@test "hs_validate_app accepts app name with dots and dashes" {
  run hs_validate_app "com.apple.Safari-2.0"
  [ "$status" -eq 0 ]
}

@test "hs_validate_app rejects shell metacharacters" {
  run hs_validate_app 'foo; rm -rf /'
  [ "$status" -eq 1 ]
  [[ "$output" == *"invalid app name"* ]]
}

@test "hs_validate_app rejects backticks" {
  run hs_validate_app 'foo`whoami`'
  [ "$status" -eq 1 ]
}

@test "hs_validate_app rejects dollar signs" {
  run hs_validate_app 'foo$HOME'
  [ "$status" -eq 1 ]
}

# ── hs_validate_lua_str ─────────────────────────────────────

@test "hs_validate_lua_str accepts normal string" {
  run hs_validate_lua_str "hello world"
  [ "$status" -eq 0 ]
}

@test "hs_validate_lua_str accepts string with single brackets" {
  run hs_validate_lua_str "foo]bar[baz"
  [ "$status" -eq 0 ]
}

@test "hs_validate_lua_str rejects double closing brackets" {
  run hs_validate_lua_str 'foo]]bar'
  [ "$status" -eq 1 ]
  [[ "$output" == *"must not contain"* ]]
}

# ── hs_validate_num ──────────────────────────────────────────

@test "hs_validate_num accepts positive integer" {
  run hs_validate_num "42"
  [ "$status" -eq 0 ]
}

@test "hs_validate_num accepts negative integer" {
  run hs_validate_num "-7"
  [ "$status" -eq 0 ]
}

@test "hs_validate_num accepts zero" {
  run hs_validate_num "0"
  [ "$status" -eq 0 ]
}

@test "hs_validate_num rejects float" {
  run hs_validate_num "3.14"
  [ "$status" -eq 1 ]
  [[ "$output" == *"expected number"* ]]
}

@test "hs_validate_num rejects string" {
  run hs_validate_num "abc"
  [ "$status" -eq 1 ]
}

@test "hs_validate_num rejects empty string" {
  run hs_validate_num ""
  [ "$status" -eq 1 ]
}
