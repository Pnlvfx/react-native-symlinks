import type { MetroConfig } from '@react-native/metro-config';
import { getBlockList } from '../block-list.js';
import { getPeerDeps } from '../peers.js';
import path from 'node:path';

export const createMetroConfigs = (localPackages: Record<string, string>) => {
  const packagePaths = Object.values(localPackages).map((p) => path.resolve(p));
  const peers = getPeerDeps(packagePaths);

  return {
    watchFolders: packagePaths,
    resolver: {
      blockList: getBlockList(packagePaths, peers),
      extraNodeModules: new Proxy(localPackages, {
        get: (target, name: string) =>
          // redirects dependencies referenced from external modules to local node_modules
          name in target ? target[name] : `node_modules/${name}`,
      }),
    },
  } satisfies MetroConfig;
};
