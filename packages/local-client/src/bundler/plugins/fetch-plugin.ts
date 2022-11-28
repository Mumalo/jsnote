import * as esbuild from 'esbuild-wasm';
import {OnLoadResult} from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
    name: 'fileCache'
});

(async () => {
    await fileCache.setItem('color', 'red')
})()

export const fetchPlugin = (input: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /^index\.js$/}, () => {
                return {
                    loader: 'jsx',
                    contents: input,
                };
            });

            build.onLoad({ filter: /\.*/}, async (args: any) => {
                // check if we have fetched file and if it is in the cache
                // if it is, return immediately
                const cachedResult = await fileCache.getItem<OnLoadResult>(args.path);

                if (cachedResult) {
                    return cachedResult;
                }
            })

            build.onLoad({ filter: /.css$/}, async (args: any) => {

                // check if we have fetched file and if it is in the cahce
                // if it is, return immediately
                const { data, request } = await axios.get(args.path);
                const escapedCss = data
                    .replace(/\n/g, '') // escape new lines
                    .replace(/\"/g, '\\"') // escape double quotes
                    .replace(/\'/g, "\\'") // escape single quotes

                const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escapedCss}';
                    document.head.appendChild(style);
                `

                const result: OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL("./", request.responseURL).pathname
                }

                await fileCache.setItem(args.path, result);
                return result;
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                const result: OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL("./", request.responseURL).pathname
                }

                await fileCache.setItem(args.path, result);
                return result;
            });
        }
    }
}
