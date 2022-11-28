import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            // tell esbuild where to look for files
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResole', args);
                // load only files with namespace of a
                return { path: args.path, namespace: 'a' };
            });

            // load these files
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                if (args.path === 'index.ts') {
                    return {
                        loader: 'jsx',
                        contents: `
              import message from './message';
              console.log(message);
            `,
                    };
                } else {
                    return {
                        loader: 'jsx',
                        contents: 'export default "hi there!"',
                    };
                }
            });
        },
    };
};
