/** @jsxImportSource jsx-md */

import { readdirSync, readFileSync } from "fs";
import { join, resolve } from "path";

import {
  Heading, Paragraph, CodeBlock,
  Bold, Code, Link,
  Badge, Badges, Center, Section,
  Table, TableHead, TableRow, Cell,
} from "readme/src/components";

// ── Dynamic data ─────────────────────────────────────────────

const REPO_DIR = resolve(import.meta.dirname);

// Count tasks (excluding _hs helper and test)
function countTasks(dir: string, prefix = ""): string[] {
  const tasks: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_")) continue;
    if (entry.name === "test") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      tasks.push(...countTasks(full, `${prefix}${entry.name}:`));
    } else {
      tasks.push(`${prefix}${entry.name}`);
    }
  }
  return tasks;
}

const taskDir = join(REPO_DIR, ".mise/tasks");
const tasks = countTasks(taskDir);

// Parse task descriptions
const taskInfo = tasks.map((name) => {
  const filePath = join(taskDir, name.replace(/:/g, "/"));
  const content = readFileSync(filePath, "utf-8");
  const match = content.match(/#MISE description="(.+?)"/);
  return { name, desc: match?.[1] ?? "" };
});

// Count tests from .bats files
const testDir = join(REPO_DIR, "test");
const testCount = readdirSync(testDir)
  .filter((f) => f.endsWith(".bats"))
  .reduce((sum, f) => {
    const content = readFileSync(join(testDir, f), "utf-8");
    return sum + (content.match(/@test /g) || []).length;
  }, 0);

// Group tasks by namespace
const namespaces = new Map<string, typeof taskInfo>();
for (const t of taskInfo) {
  const ns = t.name.includes(":") ? t.name.split(":")[0] : "(root)";
  if (!namespaces.has(ns)) namespaces.set(ns, []);
  namespaces.get(ns)!.push(t);
}

// ── README ───────────────────────────────────────────────────

const readme = (
  <>
    <Center>
      <Heading level={1}>butthair</Heading>

      <Paragraph>
        <Bold>Desktop automation for macOS via Hammerspoon.</Bold>
      </Paragraph>

      <Paragraph>
        Shell commands for windows, spaces, screenshots, keyboards, and notifications.{"\n"}
        No Lua required — just bash tasks that talk to the Hammerspoon API.
      </Paragraph>

      <Badges>
        <Badge label="shell" value="bash" color="4EAA25" logo="gnubash" logoColor="white" />
        <Badge label="runtime" value="mise" color="7c3aed" href="https://mise.jdx.dev" />
        <Badge label="tasks" value={`${tasks.length}`} color="blue" />
        <Badge label="tests" value={`${testCount}`} color="green" />
        <Badge label="License" value="MIT" color="blue" href="LICENSE" />
      </Badges>
    </Center>

    <Section title="How it works">
      <Paragraph>
        Every command is a mise task that calls Hammerspoon's <Code>hs</Code> CLI
        with a Lua expression. The <Code>_hs</Code> helper handles CLI discovery,
        process checks, input validation, and IPC health — tasks stay thin.
      </Paragraph>

      <CodeBlock lang="bash">{`# Move a window to the left half of the screen
butthair windows:move "Arc" --x 0 --y 0 --w 960 --h 1080

# Switch to space 3
butthair spaces:goto 3

# Take a screenshot
butthair screenshot

# Check everything's healthy
butthair status`}</CodeBlock>
    </Section>

    <Section title="Install">
      <CodeBlock lang="bash">{`shiv install butthair`}</CodeBlock>

      <Paragraph>
        Requires <Link href="https://www.hammerspoon.org/">Hammerspoon</Link> — install
        it with <Code>butthair install</Code> or download from the website.
      </Paragraph>
    </Section>

    <Section title="Tasks">
      <Table>
        <TableHead>
          <Cell>Task</Cell>
          <Cell>Description</Cell>
        </TableHead>
        {taskInfo.map((t) => (
          <TableRow>
            <Cell><Code>{t.name}</Code></Cell>
            <Cell>{t.desc}</Cell>
          </TableRow>
        ))}
      </Table>
    </Section>

    <Section title="Development">
      <CodeBlock lang="bash">{`gh repo clone KnickKnackLabs/butthair
cd butthair && mise trust && mise install
mise run test   # ${testCount} tests`}</CodeBlock>
    </Section>

    <Center>
      <Section title="License">
        <Paragraph>MIT</Paragraph>
      </Section>

      <Paragraph>
        {"This README was created using "}
        <Link href="https://github.com/KnickKnackLabs/readme">readme</Link>.
      </Paragraph>
    </Center>
  </>
);

console.log(readme);
