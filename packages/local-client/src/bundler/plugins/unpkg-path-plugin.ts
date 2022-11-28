import * as esbuild from 'esbuild-wasm';

const baseurl = 'https://unpkg.com'

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            // handle root entry of a module 'index.ts'
            build.onResolve({ filter: /(^index\.js$)/}, async () => {
                return { path: 'index.ts', namespace: 'a'}
            });

            // if we are bundling ./ or ../ ie relative imports of module
            build.onResolve({filter: /^\.+\//}, async (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path, `${baseurl}${args.resolveDir}/`).href
                }
            });

            // main file of a module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });


        },
    };
};
