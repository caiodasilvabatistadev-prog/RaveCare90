import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
async function scan(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = `${folder}/${entry.name}`;
    if (entry.isDirectory()) await scan(path);
    else if (path.endsWith('.js')) {
      const result = spawnSync(process.execPath, ['--check', path], { stdio: 'inherit' });
      if (result.status !== 0) process.exit(1);
      const source = await readFile(path, 'utf8');
      if (path.includes('/src/') && /console\.(log|error|info)\([^'"`]/.test(source)) throw new Error(`Unsafe logging in ${path}`);
    }
  }
}
await scan('backend');
await scan('scripts');
console.info('Syntax and basic logging checks passed');
