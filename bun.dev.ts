import { spawn } from 'bun'

function run(command: string, args: string[]) {
  return spawn({
    cmd: [command, ...args],
    stdout: 'inherit',
    stderr: 'inherit',
  })
}

await Promise.all([run('bun', ['run', 'bun.build.ts']), run('bun', ['run', 'bun.server.ts'])])
