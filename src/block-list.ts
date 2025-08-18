import path from 'node:path';
import escape from 'escape-string-regexp';

export const getBlockList = (packages: string[], peers: string[]) => {
  return new RegExp(
    '(' +
      Object.values(packages)
        .flatMap((dir) => peers.map((m) => `^${escape(path.join(dir, 'node_modules', m))}\\/.*$`))
        .join('|') +
      ')$',
  );
};
