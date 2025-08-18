/* eslint-disable sonarjs/no-alphabetical-sort */
import fs from 'node:fs';
import path from 'node:path';

interface PkgJson {
  peerDependencies?: Record<string, string>;
}

const getPkgSync = (root: string) => {
  const buf = fs.readFileSync(path.join(root, 'package.json'));
  return JSON.parse(buf.toString()) as PkgJson;
};

export const getPeerDeps = (packages: string[]) => {
  return Object.values(packages)
    .flatMap((root) => {
      const pkg = getPkgSync(root);
      return pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [];
    })
    .sort()
    .filter((m, i, self) => self.lastIndexOf(m) === i);
};
